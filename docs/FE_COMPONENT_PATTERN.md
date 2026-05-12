Hãy đóng vai là một Senior Frontend Developer. Nhiệm vụ của bạn là tạo một Common Component mới tên là: [ĐIỀN_TÊN_COMPONENT_VÀO_ĐÂY, ví dụ: TextField, Modal, Badge...]"

Yêu cầu BẮT BUỘC: Bạn phải tuân thủ chặt chẽ kiến trúc 4 file của dự án và các quy tắc styling bằng Material UI (MUI). Mọi file được tạo ra đều phải có header bản quyền sau ở dòng đầu tiên:
/\*

- Copyright (c) 2026 GTP26
- All rights reserved.
  \*/

1. Cấu trúc thư mục (tạo trong thư mục của component):

- `page.tsx`: Chứa UI chính của Component.
  - Chỉ import `styles` và `interface` từ file `index.ts`.
  - Gộp style bằng hàm `mergeSx` từ `@/shared/shared.styles`.
  - KHÔNG CẦN sử dụng forwardRef nếu không thực sự cần thiết.
- `_interface.ts`: Chứa tất cả các type, interface, type alias (như size, variant, color...) cho props của Component. Định nghĩa tường minh các props thay vì kế thừa phức tạp.
- `_styles.ts`: Chứa logic sinh ra `SxProps<Theme>` cho MUI.
  - Trích xuất style dựa trên props truyền vào bằng các hàm helper (ví dụ: `get[Component]Sx`).
  - Import các token màu sắc, kích thước, hiệu ứng từ `@/theme/colors`, `@/theme/dimensions`, `@/theme/resources`, `@/theme/effects`.
  - Ưu tiên dùng semantic token của app "Warm Da Nang Street-Food Assistant": `colors.food`, CSS variables trong `globals.css`, `fontFamilies`, `fontWeights`, `effects`, `dimensions`.
  - KHÔNG tạo thêm Tailwind class string cho style mặc định của component mới; nếu component cũ còn nhận `className`, chỉ giữ như escape hatch tương thích.
  - Import hàm `pxToRem` từ `@/shared/utils` để set font-size hoặc spacing.
  - Export ra một constant `styles` chứa tất cả các hàm sinh style.
- `index.ts`: Đóng vai trò là file Barrel. Export tất cả từ `_styles`, `_interface` và export default từ `page`.

2. Tham khảo Code Mẫu (Pattern Reference):
   Hãy học theo cách tổ chức code của component Button dưới đây để viết component mới:

index.ts
/\*

- Copyright (c) 2026 GTP26
- All rights reserved.
  _/
  export _ from './\_styles'
  export \* from './\_interface'
  export { default as Button } from './page'

page.tsx
/\*

- Copyright (c) 2026 GTP26
- All rights reserved.
  \*/
  import { Button as ButtonMUI, Tooltip } from '@mui/material'
  import { IButtonProps, styles } from '.'
  import { mergeSx } from '@/shared/shared.styles'
  import EllipsisTooltip from '../ellipsis-tooltip'

export default function Button({
type = 'primary',
size = 'medium',
...props
}: IButtonProps) {
const { onClick, hoverTooltip, children, disabled, startIcon, endIcon, sx } = props
return (
<Tooltip title={hoverTooltip} placement="top" arrow>
<ButtonMUI
sx={mergeSx(styles.getButtonSx(type, size), sx)}
disabled={disabled}
onClick={onClick}
startIcon={startIcon}
endIcon={endIcon} >
<EllipsisTooltip
variant={props.variant ?? 'h5'}
sx={props.sxTitle}
title={children as string}
/>
</ButtonMUI>
</Tooltip>
)
}

\_styles.ts
/\*

- Copyright (c) 2026 GTP26
- All rights reserved.
  \*/
  import { SxProps, Theme } from '@mui/material'
  import { alpha } from '@mui/material/styles'
  import { colors } from '@/theme/colors'
  import { dimensions } from '@/theme/dimensions'
  import { fontWeights } from '@/theme/resources'
  import { effects } from '@/theme/effects'
  import { ButtonType, ButtonSize } from '.'
  import { pxToRem } from '@/shared/utils'

// Opacity when button acvitve
export const activOpacity = 0.6

/\*\*

- Get button style configuration based on buttonType
  \*/
  const getButtonSize = (size: ButtonSize) => {
  switch (size) {
  case 'large':
  return {
  height: dimensions.buttonHeight.large,
  }
  case 'medium':
  return {
  height: dimensions.buttonHeight.medium,
  }
  case 'small':
  return {
  height: dimensions.buttonHeight.small,
  }
  }
  }

/\*\*

- Get button style configuration based on buttonType
  \*/
  const getButtonColors = (type: ButtonType) => {
  switch (type) {
  case 'primary':
  return {
  background: colors.backgroundButtons.primary.main,
  color: colors.text.white,
  active: `linear-gradient(90deg, ${alpha(
          colors.base.brand[400],
          activOpacity,
        )} 0%, ${alpha(colors.base.brand[900], activOpacity)} 100%)`,
  border: 'none',
  }
  case 'secondary':
  return {
  background: colors.backgroundButtons.secondary.main,
  color: colors.secondary.main,
  border: 2px solid ${colors.secondary.main},
  }
  case 'danger':
  return {
  background: colors.backgroundButtons.danger.main,
  color: colors.text.white,
  border: 'none',
  }
  case 'warning':
  return {
  background: colors.backgroundButtons.warning.main,
  color: colors.text.white,
  border: 'none',
  }
  case 'ghost':
  // return {
  // background: colors.backgroundButtons.ghost.main,
  // color: colors.text.white,
  // border: 2px solid ${colors.base.gray[100]},
  // }
  // Update by style customer
  return {
  background: colors.backgroundButtons.tertiary.main,
  color: colors.text.white,
  border: 2px solid ${colors.backgroundButtons.tertiary.main},
  }
  case 'tertiary':
  return {
  background: colors.backgroundButtons.tertiary.main,
  color: colors.text.white,
  border: 2px solid ${colors.backgroundButtons.tertiary.main},
  }
  }
  }

/\*\*

- Get SxProps for button based on buttonType
- Follows pattern from dialog/input components
  \*/
  export const getButtonSx = (
  buttonType: ButtonType,
  size: ButtonSize,
  ): SxProps<Theme> => {
  const config = getButtonColors(buttonType)
  const sizeConfig = getButtonSize(size)

return {
background: config.background,
color: config.color,
fontWeight: fontWeights.medium,
border: config.border,
height: sizeConfig.height,
width: 'fit-content',
paddingInline: pxToRem(20),
borderRadius: effects.borderRadius.lg,
textTransform: 'none',
'&:hover': {
'& .MuiTypography-root': {
textDecoration: 'underline',
textUnderlineOffset: '0.2rem',
},
},
'&:active': {
background: config.active || alpha(config.background, activOpacity),
},
'&.Mui-disabled': {
backgroundColor: config.background,
color: config.color,
opacity: 0.4,
'&:hover': {
'& .MuiTypography-root': {
textDecoration: 'none',
textUnderlineOffset: '0',
},
},
'&:active': { background: config.background },
},
'& .MuiButton-startIcon': {
marginRight: pxToRem(10),
},
'&:disabled': {
cursor: 'not-allowed',
pointerEvents: 'auto',
},
}
}

export const styles = {
// Button style generator
getButtonSx,
} as const

\_interface.ts

/\*

- Copyright (c) 2026 GTP26
- All rights reserved.
  \*/
  import {
  SxProps,
  Theme,
  TypographyPropsVariantOverrides,
  TypographyVariant,
  } from '@mui/material'
  import { OverridableStringUnion } from '@mui/types'
  import { MouseEventHandler } from 'react'

export type ButtonType =
| 'primary'
| 'secondary'
| 'danger'
| 'warning'
| 'ghost'
| 'tertiary'

export type ButtonSize = 'large' | 'medium' | 'small'

export interface IButtonProps {
children?: React.ReactNode
type?: ButtonType
size?: ButtonSize
onClick?: MouseEventHandler<HTMLButtonElement> | undefined
hoverTooltip?: string
disabled?: boolean
startIcon?: React.ReactNode
endIcon?: React.ReactNode
sx?: SxProps<Theme>
sxTitle?: SxProps<Theme>
variant?: OverridableStringUnion<
TypographyVariant | 'inherit',
TypographyPropsVariantOverrides

> }
