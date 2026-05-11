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
}: MultiSelectPillsProps) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
      return;
    }

    onChange([...value, option]);
  };

  const getSelectedClassName = () => {
    switch (variant) {
      case "danger":
        return styles.optionButtonDanger;
      case "success":
        return styles.optionButtonSuccess;
      default:
        return styles.optionButtonDefault;
    }
  };

  return (
    <Box className={styles.root}>
      {options.map((option) => {
        const isSelected = value.includes(option);

        return (
          <Button
            type="button"
            variant="ghost"
            key={option}
            onClick={() => toggleOption(option)}
            className={`${styles.optionButtonBase} ${
              isSelected ? getSelectedClassName() : styles.optionButtonInactive
            }`}
          >
            {isSelected && <Check className={styles.optionIcon} />}
            {option}
          </Button>
        );
      })}
    </Box>
  );
}

export default MultiSelectPills;
