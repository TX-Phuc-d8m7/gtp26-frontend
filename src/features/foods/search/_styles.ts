/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Theme } from "@mui/material/styles";

export const rootStyles = (theme: Theme) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
});

export const headerStyles = (theme: Theme) => ({
  position: "sticky",
  top: 0,
  zIndex: 10,
  padding: "1rem",
  backgroundColor: "color-mix(in srgb, var(--background) 80%, transparent)",
  backdropFilter: "blur(12px)",
  borderBottom: "1px solid var(--border)",
});

export const headerContentStyles = (theme: Theme) => ({
  maxWidth: "64rem",
  marginInline: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const titleRowStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

export const backButtonStyles = (theme: Theme) => ({
  padding: "0.5rem",
  marginLeft: "-0.5rem",
  borderRadius: "9999px",
  transition: "background-color 150ms ease",
  "&:hover": {
    backgroundColor: "var(--secondary)",
  },
});

export const backIconStyles = (theme: Theme) => ({
  width: 20,
  height: 20,
  color: "var(--muted-foreground)",
});

export const titleStyles = (theme: Theme) => ({
  fontSize: "1.25rem",
  lineHeight: "1.75rem",
  fontWeight: 700,
});

export const searchRowStyles = (theme: Theme) => ({
  display: "flex",
  gap: "0.5rem",
});

export const searchFieldStyles = (theme: Theme) => ({
  position: "relative",
  flex: 1,
});

export const searchIconStyles = (theme: Theme) => ({
  position: "absolute",
  left: "0.75rem",
  top: "50%",
  width: 20,
  height: 20,
  color: "var(--muted-foreground)",
  transform: "translateY(-50%)",
});

export const searchInputStyles = (theme: Theme) => ({
  width: "100%",
  height: 48,
  borderRadius: "0.75rem",
  border: "1px solid var(--input)",
  backgroundColor: "var(--background)",
  padding: "0 1rem 0 2.5rem",
  transition: "box-shadow 150ms ease",
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 2px color-mix(in srgb, var(--primary) 50%, transparent)",
  },
});

export const filterButtonStyles = (theme: Theme) => ({
  height: 48,
  width: 48,
  borderRadius: "0.75rem",
  border: "1px solid var(--input)",
  backgroundColor: "var(--background)",
  transition: "background-color 150ms ease",
  "&:hover": {
    backgroundColor: "var(--secondary)",
  },
});

export const categoryListStyles = (theme: Theme) => ({
  display: "flex",
  gap: "0.5rem",
  overflowX: "auto",
  paddingBottom: "0.5rem",
  marginInline: {
    xs: "-1rem",
    sm: 0,
  },
  paddingInline: {
    xs: "1rem",
    sm: 0,
  },
});

export const categoryButtonBaseStyles = (theme: Theme) => ({
  whiteSpace: "nowrap",
  borderRadius: "9999px",
  border: "1px solid",
  padding: "0.5rem 1rem",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 500,
  transition: "background-color 150ms ease, color 150ms ease",
});

export const categoryButtonActiveStyles = (theme: Theme) => ({
  backgroundColor: "var(--primary)",
  color: "var(--primary-foreground)",
  borderColor: "var(--primary)",
});

export const categoryButtonInactiveStyles = (theme: Theme) => ({
  backgroundColor: "var(--background)",
  color: "var(--muted-foreground)",
  borderColor: "var(--border)",
  "&:hover": {
    backgroundColor: "var(--secondary)",
  },
});

export const resultsAreaStyles = (theme: Theme) => ({
  flex: 1,
  overflowY: "auto",
  padding: "1rem 1rem 5rem",
});

export const resultsContentStyles = (theme: Theme) => ({
  maxWidth: "64rem",
  marginInline: "auto",
});

export const emptyStateStyles = (theme: Theme) => ({
  paddingBlock: "5rem",
  textAlign: "center",
});

export const emptyIconStyles = (theme: Theme) => ({
  width: 48,
  height: 48,
  marginInline: "auto",
  marginBottom: "1rem",
  color: "color-mix(in srgb, var(--muted-foreground) 30%, transparent)",
});

export const emptyTitleStyles = (theme: Theme) => ({
  fontSize: "1.125rem",
  lineHeight: "1.75rem",
  fontWeight: 500,
});

export const emptyDescriptionStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
});

export const gridStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: {
    xs: "repeat(1, minmax(0, 1fr))",
    sm: "repeat(2, minmax(0, 1fr))",
    md: "repeat(3, minmax(0, 1fr))",
    lg: "repeat(4, minmax(0, 1fr))",
  },
  gap: "1.5rem",
});

export const cardStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  cursor: "pointer",
  overflow: "hidden",
  borderRadius: "0.75rem",
  border: "1px solid var(--border)",
  backgroundColor: "var(--card)",
  color: "var(--card-foreground)",
  boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  transition:
    "border-color 300ms ease, box-shadow 300ms ease, transform 300ms ease",
  "&:hover": {
    borderColor: "color-mix(in srgb, var(--primary) 50%, transparent)",
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  "&:hover [data-food-card-image='true']": {
    transform: "scale(1.05)",
  },
  "&:hover [data-food-card-title='true']": {
    color: "var(--primary)",
  },
});

export const cardImageWrapperStyles = (theme: Theme) => ({
  position: "relative",
  height: 192,
  width: "100%",
  overflow: "hidden",
  backgroundColor: "var(--muted)",
});

export const cardImageStyles = (theme: Theme) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 500ms ease",
});

export const cardBadgeWrapperStyles = (theme: Theme) => ({
  position: "absolute",
  top: "0.5rem",
  right: "0.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const allergyBadgeStyles = (theme: Theme) => ({
  borderRadius: "9999px",
  backgroundColor: "rgb(239 68 68 / 0.9)",
  color: "#fff",
  padding: "0.25rem 0.5rem",
  fontSize: "10px",
  lineHeight: "1rem",
  fontWeight: 700,
  boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  backdropFilter: "blur(4px)",
});

export const cardBodyStyles = (theme: Theme) => ({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  padding: "1rem",
});

export const cardTitleRowStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "0.5rem",
  marginBottom: "0.5rem",
});

export const cardTitleStyles = (theme: Theme) => ({
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  fontSize: "1.125rem",
  lineHeight: "1.75rem",
  fontWeight: 700,
  transition: "color 150ms ease",
});

export const caloriesStyles = (theme: Theme) => ({
  whiteSpace: "nowrap",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 500,
  color: "var(--primary)",
});

export const cardDescriptionStyles = (theme: Theme) => ({
  flex: 1,
  marginBottom: "1rem",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: "var(--muted-foreground)",
});

export const cardCategoryListStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.25rem",
  marginTop: "auto",
});

export const cardCategoryStyles = (theme: Theme) => ({
  display: "inline-flex",
  alignItems: "center",
  borderRadius: "9999px",
  backgroundColor: "var(--secondary)",
  color: "var(--secondary-foreground)",
  padding: "0.125rem 0.5rem",
  fontSize: "0.75rem",
  lineHeight: "1rem",
  fontWeight: 500,
});

export const sheetContentStyles = (theme: Theme) => ({
  width: "100%",
  maxWidth: {
    sm: "28rem",
    md: "32rem",
  },
  overflowY: "auto",
  padding: 0,
});

export const detailRootStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100%",
});

export const detailImageWrapperStyles = (theme: Theme) => ({
  position: "relative",
  height: 256,
  width: "100%",
  flexShrink: 0,
  backgroundColor: "var(--muted)",
});

export const detailImageStyles = (theme: Theme) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const detailImageOverlayStyles = (theme: Theme) => ({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to top, color-mix(in srgb, var(--background) 90%, transparent), transparent)",
});

export const detailTitleWrapperStyles = (theme: Theme) => ({
  position: "absolute",
  bottom: "1rem",
  left: "1.5rem",
  right: "1.5rem",
});

export const detailTitleStyles = (theme: Theme) => ({
  marginBottom: "0.25rem",
  fontSize: "1.875rem",
  lineHeight: "2.25rem",
  fontWeight: 700,
  color: "var(--foreground)",
});

export const detailPriceStyles = (theme: Theme) => ({
  fontWeight: 600,
  color: "var(--primary)",
});

export const detailBodyStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  padding: "1.5rem",
});

export const detailDescriptionStyles = (theme: Theme) => ({
  fontSize: "1rem",
  lineHeight: "1.625rem",
  color: "color-mix(in srgb, var(--foreground) 90%, transparent)",
});

export const detailTagListStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  marginTop: "1rem",
});

export const detailTagStyles = (theme: Theme) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.25rem",
  borderRadius: "9999px",
  backgroundColor: "var(--secondary)",
  color: "var(--secondary-foreground)",
  padding: "0.25rem 0.75rem",
  fontSize: "0.75rem",
  lineHeight: "1rem",
  fontWeight: 500,
});

export const detailTagIconStyles = (theme: Theme) => ({
  width: 12,
  height: 12,
});

export const detailSectionTitleStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "0.75rem",
  fontWeight: 600,
});

export const detailSectionIconStyles = (theme: Theme) => ({
  width: 20,
  height: 20,
  color: "var(--primary)",
});

export const nutritionGridStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "0.5rem",
  textAlign: "center",
});

export const nutritionItemStyles = (theme: Theme) => ({
  borderRadius: "0.5rem",
  backgroundColor: "var(--muted)",
  padding: "0.5rem",
});

export const nutritionValueStyles = (theme: Theme) => ({
  fontSize: "1.125rem",
  lineHeight: "1.75rem",
  fontWeight: 700,
});

export const nutritionLabelStyles = (theme: Theme) => ({
  fontSize: "0.75rem",
  lineHeight: "1rem",
  color: "var(--muted-foreground)",
});

export const ingredientListStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
});

export const ingredientStyles = (theme: Theme) => ({
  borderRadius: "0.375rem",
  border: "1px solid var(--border)",
  backgroundColor: "var(--background)",
  padding: "0.375rem 0.75rem",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
});

export const warningBoxStyles = (theme: Theme) => ({
  borderRadius: "0.75rem",
  border: "1px solid rgb(239 68 68 / 0.2)",
  backgroundColor: "rgb(239 68 68 / 0.1)",
  padding: "1rem",
});

export const warningTitleStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "0.5rem",
  fontWeight: 600,
  color: "#dc2626",
});

export const warningIconStyles = (theme: Theme) => ({
  width: 20,
  height: 20,
});

export const warningTextStyles = (theme: Theme) => ({
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: "var(--foreground)",
});

export const warningTextSpacedStyles = (theme: Theme) => ({
  ...warningTextStyles(theme),
  marginBottom: "0.5rem",
});

export const warningStrongStyles = (theme: Theme) => ({
  fontWeight: 600,
  color: "#dc2626",
});

export const styles = {
  rootStyles,
  headerStyles,
  headerContentStyles,
  titleRowStyles,
  backButtonStyles,
  backIconStyles,
  titleStyles,
  searchRowStyles,
  searchFieldStyles,
  searchIconStyles,
  searchInputStyles,
  filterButtonStyles,
  categoryListStyles,
  categoryButtonBaseStyles,
  categoryButtonActiveStyles,
  categoryButtonInactiveStyles,
  resultsAreaStyles,
  resultsContentStyles,
  emptyStateStyles,
  emptyIconStyles,
  emptyTitleStyles,
  emptyDescriptionStyles,
  gridStyles,
  cardStyles,
  cardImageWrapperStyles,
  cardImageStyles,
  cardBadgeWrapperStyles,
  allergyBadgeStyles,
  cardBodyStyles,
  cardTitleRowStyles,
  cardTitleStyles,
  caloriesStyles,
  cardDescriptionStyles,
  cardCategoryListStyles,
  cardCategoryStyles,
  sheetContentStyles,
  detailRootStyles,
  detailImageWrapperStyles,
  detailImageStyles,
  detailImageOverlayStyles,
  detailTitleWrapperStyles,
  detailTitleStyles,
  detailPriceStyles,
  detailBodyStyles,
  detailDescriptionStyles,
  detailTagListStyles,
  detailTagStyles,
  detailTagIconStyles,
  detailSectionTitleStyles,
  detailSectionIconStyles,
  nutritionGridStyles,
  nutritionItemStyles,
  nutritionValueStyles,
  nutritionLabelStyles,
  ingredientListStyles,
  ingredientStyles,
  warningBoxStyles,
  warningTitleStyles,
  warningIconStyles,
  warningTextStyles,
  warningTextSpacedStyles,
  warningStrongStyles,
} as const;
