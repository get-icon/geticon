export type IconDataFilesItemType = {
  filename: string
  type: 'icon' | 'logo' | 'icon-monochrome'
  desc?: string
  tags?: string[]
  source?: string
}

export type IconDataItemType = {
  name: string
  id: string
  aliases?: string[]
  tags?: string[]
  url: string
  files: IconDataFilesItemType[]
}

export type IconDataType = IconDataItemType[]
