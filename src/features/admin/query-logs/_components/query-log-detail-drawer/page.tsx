/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { Drawer, Skeleton } from "@mui/material";
import {
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Clock,
  Filter,
  Hash,
  Layers,
  MessageSquare,
  Search,
  Tag,
  Trash2,
  X,
} from "lucide-react";

import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Typography } from "@/shared/components/ui/typography/index";

import type { AdminQueryLogResult } from "../../_interface";
import { styles } from "../../_styles";

interface QueryLogDetailDrawerProps {
  log: AdminQueryLogResult | null;
  open: boolean;
  isDeletingId: string | null;
  onClose: () => void;
  onDelete: (log: AdminQueryLogResult) => void;
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function AiInsightSection({ insight }: { insight: Record<string, unknown> }) {
  const intent = typeof insight.intent === "string" ? insight.intent : null;
  const includeIngredients = Array.isArray(insight.include_ingredients)
    ? (insight.include_ingredients as string[])
    : [];
  const excludeIngredients = Array.isArray(insight.exclude_ingredients)
    ? (insight.exclude_ingredients as string[])
    : [];
  const includeSoftTags = Array.isArray(insight.include_soft_tags)
    ? (insight.include_soft_tags as string[])
    : [];
  const excludeSoftTags = Array.isArray(insight.exclude_soft_tags)
    ? (insight.exclude_soft_tags as string[])
    : [];
  const healthTags = Array.isArray(insight.health_conditions)
    ? (insight.health_conditions as string[])
    : [];

  const intentLabels: Record<string, string> = {
    new_search: "Tìm kiếm mới",
    follow_up: "Bổ sung / Thu hẹp",
    food_info: "Hỏi thông tin món",
    food_safety_check: "Kiểm tra y tế",
    location_search: "Tìm quán gần đây",
    chitchat: "Hội thoại thông thường",
  };

  return (
    <Box sx={styles.drawerSectionCardStyles()}>
      {intent && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.25 }}>
          <MessageSquare size={13} style={{ flexShrink: 0 }} />
          <Typography as="span" sx={styles.drawerSectionLabelStyles()}>
            Intent:
          </Typography>
          <Box
            component="span"
            sx={{
              px: 0.9, py: 0.3, borderRadius: 999,
              fontSize: 11, fontWeight: 900,
              color: "#EA580C", backgroundColor: "#FFF7ED",
              border: "1px solid #FED7AA",
              ".dark &": { color: "#FF9A1F", backgroundColor: "rgba(255,154,31,0.12)" },
            }}
          >
            {intentLabels[intent] ?? intent}
          </Box>
        </Box>
      )}

      {healthTags.length > 0 && (
        <Box sx={{ mb: 1 }}>
          <Typography as="p" sx={{ ...styles.drawerSectionLabelStyles(), mb: 0.5 }}>
            Bệnh lý / Dị ứng
          </Typography>
          <Box sx={styles.tagChipGroupStyles()}>
            {healthTags.map((t) => (
              <Box key={t} component="span" sx={{
                px: 0.9, py: 0.3, borderRadius: 999, fontSize: 11, fontWeight: 800,
                color: "#475569", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1",
                ".dark &": { color: "#CBD5E1", backgroundColor: "rgba(203,213,225,0.08)" },
              }}>
                {t}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {(includeSoftTags.length > 0 || excludeSoftTags.length > 0) && (
        <Box sx={{ mb: 1 }}>
          <Typography as="p" sx={{ ...styles.drawerSectionLabelStyles(), mb: 0.5 }}>
            Tags sở thích
          </Typography>
          <Box sx={styles.tagChipGroupStyles()}>
            {includeSoftTags.map((t) => (
              <Box key={t} component="span" sx={styles.tagChipStyles("include")()}>+ {t}</Box>
            ))}
            {excludeSoftTags.map((t) => (
              <Box key={t} component="span" sx={styles.tagChipStyles("exclude")()}>− {t}</Box>
            ))}
          </Box>
        </Box>
      )}

      {(includeIngredients.length > 0 || excludeIngredients.length > 0) && (
        <Box>
          <Typography as="p" sx={{ ...styles.drawerSectionLabelStyles(), mb: 0.5 }}>
            Nguyên liệu
          </Typography>
          <Box sx={styles.tagChipGroupStyles()}>
            {includeIngredients.map((t) => (
              <Box key={t} component="span" sx={styles.tagChipStyles("include")()}>+ {t}</Box>
            ))}
            {excludeIngredients.map((t) => (
              <Box key={t} component="span" sx={styles.tagChipStyles("exclude")()}>− {t}</Box>
            ))}
          </Box>
        </Box>
      )}

      {!intent && includeSoftTags.length === 0 && excludeSoftTags.length === 0 &&
        includeIngredients.length === 0 && excludeIngredients.length === 0 && healthTags.length === 0 && (
        <Typography as="p" sx={styles.queryMetaStyles()}>Không có dữ liệu AI insight.</Typography>
      )}
    </Box>
  );
}

function PipelineFunnel({
  candidate, filtered, scored, returned,
}: { candidate: number; filtered: number; scored: number; returned: number }) {
  const steps = [
    { label: "Candidates", value: candidate },
    { label: "Sau lọc", value: filtered },
    { label: "Sau score", value: scored },
    { label: "Trả về", value: returned },
  ];
  return (
    <Box sx={styles.funnelRowStyles()}>
      {steps.map((step, i) => (
        <Box key={step.label} sx={{ display: "flex", alignItems: "center", flex: 1, gap: 0.5 }}>
          <Box sx={{ ...styles.funnelStepStyles(i === steps.length - 1)(), flex: 1 }}>
            <Typography as="span" sx={styles.funnelNumStyles(i === steps.length - 1)()}>
              {step.value.toLocaleString("vi-VN")}
            </Typography>
            <Typography as="span" sx={styles.funnelLabelStyles()}>
              {step.label}
            </Typography>
          </Box>
          {i < steps.length - 1 && (
            <Box sx={styles.funnelArrowStyles()}>
              <ChevronRight size={14} />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

function TopResults({ results }: { results: Array<Record<string, unknown>> }) {
  if (results.length === 0) {
    return (
      <Typography as="p" sx={styles.queryMetaStyles()}>
        Không có kết quả nào được trả về.
      </Typography>
    );
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6 }}>
      {results.slice(0, 8).map((r, i) => {
        const name = typeof r.name === "string" ? r.name : `Món #${i + 1}`;
        const score =
          typeof r.final_score === "number"
            ? r.final_score.toFixed(3)
            : typeof r.score === "number"
              ? r.score.toFixed(3)
              : null;
        return (
          <Box key={i} sx={styles.topResultItemStyles(i + 1)()}>
            <Box sx={styles.rankBadgeStyles(i + 1)()}>{i + 1}</Box>
            <Typography as="span" sx={styles.topResultNameStyles()}>
              {name}
            </Typography>
            {score && (
              <Typography as="span" sx={styles.topResultScoreStyles()}>
                {score}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

export default function QueryLogDetailDrawer({
  log,
  open,
  isDeletingId,
  onClose,
  onDelete,
}: QueryLogDetailDrawerProps) {
  const isDeleting = log ? isDeletingId === log.id : false;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: styles.drawerPaperStyles() } }}
    >
      <Box sx={styles.drawerContentStyles()}>
        {/* ── Header ── */}
        <Box sx={styles.drawerHeaderStyles()}>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Search size={15} />
              <Typography as="h2" sx={styles.drawerTitleStyles()}>
                Chi tiết truy vấn
              </Typography>
            </Box>
            {log && (
              <Typography as="p" sx={styles.drawerQueryBubbleStyles()}>
                {log.query}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
            {log && (
              <Button
                type="button"
                variant="ghost"
                sx={styles.dangerActionButtonStyles()}
                disabled={isDeleting}
                title="Xóa log này"
                onClick={() => onDelete(log)}
              >
                <Trash2 size={14} />
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              sx={styles.drawerCloseButtonStyles()}
              onClick={onClose}
            >
              <X size={16} />
            </Button>
          </Box>
        </Box>

        {/* ── Scroll body ── */}
        <Box sx={styles.drawerScrollAreaStyles()}>
          {!log ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} variant="rounded" animation="wave" height={80} sx={{ borderRadius: 3 }} />
            ))
          ) : (
            <>
              {/* Meta */}
              <Box sx={styles.drawerSectionStyles()}>
                <Typography as="p" sx={styles.drawerSectionLabelStyles()}>
                  <Clock size={11} style={{ display: "inline", marginRight: 4 }} />
                  Thông tin
                </Typography>
                <Box sx={styles.drawerSectionCardStyles()}>
                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                    <Box>
                      <Typography as="p" sx={styles.queryMetaStyles()}>Thời gian</Typography>
                      <Typography as="p" sx={{ ...styles.queryTextStyles(), fontSize: 12, maxWidth: "none" }}>
                        {formatDateTime(log.created_at)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography as="p" sx={styles.queryMetaStyles()}>User ID</Typography>
                      <Typography as="p" sx={{ ...styles.queryTextStyles(), fontSize: 11, fontFamily: "monospace", maxWidth: "none" }}>
                        {log.user_id ? log.user_id.slice(0, 8) + "…" : "Anonymous"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* AI Insight */}
              <Box sx={styles.drawerSectionStyles()}>
                <Typography as="p" sx={styles.drawerSectionLabelStyles()}>
                  <Tag size={11} style={{ display: "inline", marginRight: 4 }} />
                  AI Insight
                </Typography>
                <AiInsightSection insight={log.ai_insight} />
              </Box>

              {/* Tags áp dụng */}
              {(log.user_include_tags.length > 0 || log.user_exclude_tags.length > 0) && (
                <Box sx={styles.drawerSectionStyles()}>
                  <Typography as="p" sx={styles.drawerSectionLabelStyles()}>
                    <Filter size={11} style={{ display: "inline", marginRight: 4 }} />
                    Tags áp dụng
                  </Typography>
                  <Box sx={styles.drawerSectionCardStyles()}>
                    <Box sx={styles.tagChipGroupStyles()}>
                      {log.user_include_tags.map((t) => (
                        <Box key={t} component="span" sx={styles.tagChipStyles("include")()}>+ {t}</Box>
                      ))}
                      {log.user_exclude_tags.map((t) => (
                        <Box key={t} component="span" sx={styles.tagChipStyles("exclude")()}>− {t}</Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Pipeline funnel */}
              <Box sx={styles.drawerSectionStyles()}>
                <Typography as="p" sx={styles.drawerSectionLabelStyles()}>
                  <Layers size={11} style={{ display: "inline", marginRight: 4 }} />
                  Pipeline ({log.candidate_count} → {log.returned_count})
                </Typography>
                <PipelineFunnel
                  candidate={log.candidate_count}
                  filtered={log.filtered_count}
                  scored={log.scored_count}
                  returned={log.returned_count}
                />
              </Box>

              {/* Top results */}
              <Box sx={styles.drawerSectionStyles()}>
                <Typography as="p" sx={styles.drawerSectionLabelStyles()}>
                  <Hash size={11} style={{ display: "inline", marginRight: 4 }} />
                  Kết quả top {Math.min(log.top_results.length, 8)}
                </Typography>
                <TopResults results={log.top_results} />
              </Box>

              {/* Warning */}
              {log.warning_message && (
                <Box sx={styles.drawerSectionStyles()}>
                  <Typography as="p" sx={styles.drawerSectionLabelStyles()}>
                    <AlertTriangle size={11} style={{ display: "inline", marginRight: 4 }} />
                    Cảnh báo
                  </Typography>
                  <Box sx={styles.warningBoxStyles()}>
                    <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 2, color: "#B45309" }} />
                    <Typography as="p" sx={styles.warningTextStyles()}>
                      {log.warning_message}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Retrieval notes */}
              {log.retrieval_notes.length > 0 && (
                <Box sx={styles.drawerSectionStyles()}>
                  <Typography as="p" sx={styles.drawerSectionLabelStyles()}>
                    <ArrowRight size={11} style={{ display: "inline", marginRight: 4 }} />
                    Ghi chú hệ thống ({log.retrieval_notes.length})
                  </Typography>
                  <Box sx={styles.drawerSectionCardStyles()}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                      {log.retrieval_notes.map((note, i) => (
                        <Typography key={i} as="p" sx={styles.noteItemStyles()}>
                          {note}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
