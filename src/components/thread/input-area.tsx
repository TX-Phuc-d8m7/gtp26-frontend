import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LoaderCircle } from "lucide-react";
import { FormEvent } from "react";

interface InputAreaProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onHideToolCallsChange: (checked: boolean) => void;
  hideToolCalls: boolean;
  isLoading: boolean;
  onCancel?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export function InputArea({
  input,
  onInputChange,
  onSubmit,
  onHideToolCallsChange,
  hideToolCalls,
  isLoading,
  onCancel,
  onKeyDown,
}: InputAreaProps) {
  return (
    <div className="sticky flex flex-col items-center gap-6 bottom-0 bg-gradient-to-t from-background via-background/95 to-transparent pb-8 pt-4">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-zinc-100/60 dark:bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-zinc-200 dark:border-zinc-800/50 shadow-2xl relative transition-all focus-within:border-orange-500/50 dark:focus-within:border-orange-500/80 focus-within:shadow-[0_0_20px_rgba(249,115,22,0.15)] dark:focus-within:shadow-[0_0_35px_rgba(249,115,22,0.5)]">
          <form
            onSubmit={onSubmit}
            className="grid grid-rows-[1fr_auto] gap-2 p-3"
          >
            {/* Textarea */}
            <textarea
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !e.metaKey &&
                  !e.nativeEvent.isComposing
                ) {
                  e.preventDefault();
                  const el = e.target as HTMLElement | undefined;
                  const form = el?.closest("form");
                  form?.requestSubmit();
                }
                onKeyDown?.(e);
              }}
              placeholder="Gõ tin nhắn của bạn..."
              className="p-3.5 pb-0 border-none bg-transparent field-sizing-content shadow-none ring-0 outline-none focus:outline-none focus:ring-0 resize-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 max-h-48 overflow-y-auto"
              rows={1}
            />

            {/* Footer */}
            <div className="flex items-center justify-between p-2 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50">
              <div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="render-tool-calls"
                    checked={hideToolCalls ?? false}
                    onCheckedChange={onHideToolCallsChange}
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="render-tool-calls"
                    className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer"
                  >
                    Hide Tool Calls
                  </Label>
                </div>
              </div>
              {isLoading ? (
                <Button
                  key="stop"
                  onClick={onCancel}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                  <span className="ml-2">Cancel</span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="transition-all bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:opacity-90 border-0 rounded-full px-5 shadow-lg shadow-orange-500/20 text-sm font-medium"
                  disabled={isLoading || !input.trim()}
                  size="sm"
                >
                  Send
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Helper text */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          Use Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
