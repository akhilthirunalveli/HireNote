"use client";

import { useState, useEffect } from "react";
import { extractPlaceholders } from "@/lib/template/parse";
import { detectPlaceholdersAction, generateTemplateAction, refineMessageAction, saveTemplateAction, updateTemplateAction } from "@/app/actions";
import { VersionHistoryModal } from "./VersionHistoryModal";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { User } from "@supabase/supabase-js";

type Props = {
  initialData?: {
    id: string;
    name: string;
    content: string;
    dynamic_fields: string[];
    tone: string | null;
    length: string | null;
  };
  mode?: "create" | "edit";
  user?: User | null;
};

export default function TemplateInput({ initialData, mode = "create", user }: Props) {
  const router = useRouter();
  const [template, setTemplate] = useState(initialData?.content || "");
  const [fields, setFields] = useState<string[]>(initialData?.dynamic_fields || []);
  const [values, setValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");

  // States
  const [isScanning, setIsScanning] = useState(false);
  const [isGeneratingTemplate, setIsGeneratingTemplate] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [templateName, setTemplateName] = useState(initialData?.name || "");

  // Inputs
  const [generationPrompt, setGenerationPrompt] = useState("");
  const [tone, setTone] = useState(initialData?.tone || "Neutral");
  const [length, setLength] = useState(initialData?.length || "Medium");

  // Auto-detect placeholders on change
  useEffect(() => {
    const detected = extractPlaceholders(template);
    // Only update if changed to avoid loops/re-renders (though setFields handles strict equality usually)
    setFields(prev => {
      const isSame = prev.length === detected.length && prev.every((val, index) => val === detected[index]);
      return isSame ? prev : detected;
    });
  }, [template]);

  // Helper to get API key
  const getApiKey = () => localStorage.getItem("gemini_api_key") || undefined;

  const detectWithAI = async () => {
    if (!template.trim()) return;
    setIsScanning(true);
    try {
      const apiKey = getApiKey();
      const result = await detectPlaceholdersAction(template, apiKey);
      if (result.success && result.template) {
        setTemplate(result.template);
        // Automatically extract proper fields from the new template
        const detected = extractPlaceholders(result.template);
        setFields(detected);
      } else {
        console.error(result.error);
        if (result.error && result.error.includes("403") && apiKey) {
          toast.error("Your API Key seems invalid.");
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsScanning(false);
    }
  };

  const generateTemplate = async () => {
    if (!generationPrompt.trim()) return;
    setIsGeneratingTemplate(true);
    try {
      const apiKey = getApiKey();
      const result = await generateTemplateAction(generationPrompt, apiKey);
      if (result.success && result.template) {
        setTemplate(result.template);
        const detected = extractPlaceholders(result.template);
        setFields(detected);
        setGenerationPrompt(""); // Clear prompt on success
      } else {
        console.error(result.error);
        if (result.error && result.error.includes("403") && apiKey) {
          toast.error("Your API Key seems invalid.");
        } else {
          toast.error("Failed to generate template");
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("An error occurred");
    } finally {
      setIsGeneratingTemplate(false);
    }
  };

  const generate = async () => {
    let result = template;
    fields.forEach((f) => {
      // clean formatting logic if needed
      result = result.replaceAll(`{${f}}`, values[f] || "");
    });

    // If default tone/length, just output
    let finalResult = result;
    if (tone === "Neutral" && length === "Medium") {
      setOutput(result);
      if (user) handleAutoSave(result, fields);
      return;
    }

    // Otherwise, refine with AI
    setIsRefining(true);
    try {
      const apiKey = getApiKey();
      const refined = await refineMessageAction(result, tone, length, apiKey);
      if (refined.success && refined.message) {
        setOutput(refined.message);
        finalResult = refined.message;
      } else {
        // Fallback to basic result/error
        console.error(refined.error);
        if (refined.error && refined.error.includes("403") && apiKey) {
          toast.error("Your API Key seems invalid.");
        }
        setOutput(result);
      }
    } catch (e) {
      console.error(e);
      setOutput(result);
    } finally {
      setIsRefining(false);
    }
  };

  const handleAutoSave = async (content: string, dynamicFields: string[]) => {
    if (!user) return; // Only auto-save for logged in users

    const name = templateName || `Draft ${new Date().toLocaleTimeString()}`;
    // Don't set isSaving to true to avoid blocking UI, just do it in background
    try {
      await saveTemplateAction({
        name,
        content,
        dynamic_fields: dynamicFields,
        tone,
        length
      });
    } catch (e) {
      console.error("Auto-save failed", e);
    }
  };

  const handleSave = async () => {
    if (!templateName.trim() || !template.trim()) return;
    setIsSaving(true);
    try {
      let result;
      if (mode === "edit" && initialData?.id) {
        result = await updateTemplateAction(initialData.id, {
          name: templateName,
          content: template,
          dynamic_fields: fields,
          tone,
          length
        });
      } else {
        result = await saveTemplateAction({
          name: templateName,
          content: template,
          dynamic_fields: fields,
          tone,
          length
        });
      }

      if (result.success) {
        setShowSaveModal(false);
        if (mode === "create") {
          setTemplateName("");
          alert("Template saved successfully!");
        } else {
          alert("Template updated!");
          router.refresh();
        }
      } else {
        alert(result.error);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to save template");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="glass-card p-6 md:p-8 space-y-8 animate-in fade-in zoom-in duration-500">

      {/* Generator Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-[var(--foreground)] uppercase tracking-widest pl-1">AI Template Writer</label>
          {mode === "edit" && initialData?.id && (
            <button
              onClick={() => setShowHistoryModal(true)}
              className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              History
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <input
            value={generationPrompt}
            onChange={(e) => setGenerationPrompt(e.target.value)}
            placeholder="e.g. Cold email for SDE Intern role at Google..."
            className="glass-input flex-1 px-4 py-3 text-sm"
          />
          <button
            onClick={generateTemplate}
            disabled={isGeneratingTemplate || !generationPrompt.trim()}
            className="primary-button px-6 py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingTemplate ? "Writing..." : "Write"}
          </button>
        </div>
      </div>

      <hr className="border-[var(--border)]" />

      {/* Main Editor */}
      <div className="space-y-4">
        <div className="relative">
          <textarea
            className="glass-input w-full p-4 text-sm font-mono min-h-[180px] leading-relaxed resize-none focus:ring-0 border-none bg-[var(--muted)]/30"
            placeholder="Or start typing your own template here..."
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          />
        </div>

        {/* Editor Toolbar */}
        <div className="flex justify-between items-center bg-[var(--card)] border border-[var(--border)] rounded-xl p-2">
          <div className="flex items-center gap-2">
            <button
              onClick={detectWithAI}
              disabled={isScanning || !template.trim()}
              className="text-xs font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors px-3 py-1.5 rounded-lg flex items-center gap-2"
            >
              {isScanning ? (
                <>
                  <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Scanning...
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Auto-Detect
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSaveModal(true)}
              disabled={!template.trim()}
              className={`text-xs font-bold px-4 py-1.5 rounded-lg transition-all flex items-center gap-2 ${mode === "edit"
                ? "bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]/80"
                : "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90"
                }`}
            >
              {mode === "edit" ? "Update" : "Save Template"}
            </button>
          </div>
        </div>
      </div >

      {
        fields.length > 0 && (
          <div className="space-y-3 pt-2 animate-in slide-in-from-top-2 duration-300">
            <p className="text-xs font-bold text-[var(--foreground)] uppercase tracking-widest pl-1">Dynamic Fields</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f} className="space-y-1">
                  <label className="text-[10px] text-[var(--muted-foreground)] uppercase font-semibold pl-1">{f.replace(/_/g, " ")}</label>
                  <input
                    placeholder={`Enter ${f}...`}
                    className="glass-input w-full px-3 py-2 text-sm bg-[var(--muted)]"
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [f]: e.target.value }))
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )
      }

      {/* Controls Row */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="space-y-1">
          <label className="text-[10px] text-[var(--muted-foreground)] uppercase font-semibold pl-1">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="glass-input w-full px-3 py-2 text-sm appearance-none cursor-pointer"
          >
            <option value="Neutral" className="text-[var(--foreground)]">Neutral</option>
            <option value="Formal" className="text-[var(--foreground)]">Formal</option>
            <option value="Friendly" className="text-[var(--foreground)]">Friendly</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] text-[var(--muted-foreground)] uppercase font-semibold pl-1">Length</label>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="glass-input w-full px-3 py-2 text-sm appearance-none cursor-pointer"
          >
            <option value="Short" className="text-[var(--foreground)]">Short</option>
            <option value="Medium" className="text-[var(--foreground)]">Medium</option>
            <option value="Detailed" className="text-[var(--foreground)]">Detailed</option>
          </select>
        </div>
      </div>

      <button
        onClick={generate}
        disabled={!template.trim() || isRefining}
        className="primary-button w-full py-4 text-lg font-bold mt-4 disabled:opacity-50 disabled:transform-none"
      >
        {isRefining ? "Refining Magic..." : "Generate Magic Message"}
      </button>

      {
        output && (
          <div className="mt-8 pt-6 border-t border-[var(--border)] animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs font-bold text-[var(--foreground)] uppercase tracking-widest pl-1">Ready to Send</p>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(output);
                    toast.success("Copied to clipboard!");
                  } catch (e) {
                    toast.error("Failed to copy");
                  }
                }}
                className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1"
              >
                <span>Copy Text</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </button>
            </div>
            <div className="relative group">
              <pre className="relative glass-card p-6 whitespace-pre-wrap font-sans text-[var(--foreground)] leading-relaxed border-[var(--border)] bg-[var(--muted)]">{output}</pre>
            </div>
          </div>
        )
      }

      {
        showSaveModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="glass-card w-full max-w-sm p-6 space-y-4 animate-in zoom-in-95 duration-200">

              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  {mode === "edit" ? "Update Template" : "Save Template"}
                </h3>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--foreground)] uppercase tracking-widest pl-1">Template Name</label>
                <input
                  autoFocus
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="glass-input w-full px-4 py-2.5"
                  placeholder="e.g. Outreach V1"
                />
              </div>

              <div className="flex justify-end items-center gap-2 pt-2">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors px-3 py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving || !templateName.trim()}
                  className="primary-button px-5 py-2 text-xs font-bold shadow-lg"
                >
                  {isSaving ? "Saving..." : (mode === "edit" ? "Update" : "Save")}
                </button>
              </div>
            </div>
          </div>
        )
      }

      {
        initialData?.id && (
          <VersionHistoryModal
            templateId={initialData.id}
            isOpen={showHistoryModal}
            onClose={() => setShowHistoryModal(false)}
            onRestore={() => {
              // Refresh the page to load restored data
              router.refresh();
            }}
          />
        )
      }
    </div >
  )
};