/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { AdminUserResult } from "../../_interface";

export interface UserDetailDrawerProps {
  actionUserId: string | null;
  user: AdminUserResult | null;
  open: boolean;
  onClose: () => void;
  onLock: (user: AdminUserResult) => void;
  onUnlock: (user: AdminUserResult) => void;
  onChangeRole: (user: AdminUserResult, role: "user" | "admin") => void;
}
