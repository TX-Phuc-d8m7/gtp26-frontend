/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Check } from "lucide-react";

import { MultiSelectPillsProps, styles } from ".";
import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";

function MultiSelectPills({
  options,
  value,
  onChange,
  variant = "default",
  sx,
}: MultiSelectPillsProps) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
      return;
    }

    onChange([...value, option]);
  };

  return (
    <Box sx={[styles.rootStyles, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}>
      {options.map((option) => {
        const isSelected = value.includes(option);

        return (
          <Button
            type="button"
            variant="ghost"
            key={option}
            onClick={() => toggleOption(option)}
            sx={styles.optionButtonStyles(variant, isSelected)}
          >
            {isSelected && (
              <Box component={Check} sx={styles.optionIconStyles} />
            )}
            {option}
          </Button>
        );
      })}
    </Box>
  );
}

export default MultiSelectPills;
