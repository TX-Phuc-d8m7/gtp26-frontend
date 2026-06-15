/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

export interface AdminQueryLogResult {
  id: string;
  user_id: string | null;
  thread_id: string | null;
  query: string;
  ai_insight: Record<string, unknown>;
  final_exclude_ings: string[];
  exclude_ingredient_keys: string[];
  user_include_tags: string[];
  user_exclude_tags: string[];
  candidate_count: number;
  filtered_count: number;
  scored_count: number;
  returned_count: number;
  excluded_summary: Record<string, unknown>;
  retrieval_notes: string[];
  top_results: Array<Record<string, unknown>>;
  warning_message: string | null;
  created_at: string;
}

export interface AdminQueryLogListResponse {
  total: number;
  limit: number;
  offset: number;
  items: AdminQueryLogResult[];
}

export interface AdminQueryLogsQuery {
  q?: string;
  user_id?: string;
  thread_id?: string;
  from_date?: string;
  to_date?: string;
  limit?: number;
  offset?: number;
}

export interface AdminQueryLogsState {
  logs: AdminQueryLogResult[];
  total: number;
  page: number;
  rowsPerPage: number;
  searchTerm: string;
  fromDate: string;
  toDate: string;
  detailLog: AdminQueryLogResult | null;
  isDetailOpen: boolean;
}
