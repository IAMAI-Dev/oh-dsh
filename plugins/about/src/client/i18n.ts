export type AboutMessage =
  | 'about.title'
  | 'about.product-name'
  | 'about.product-subtitle'
  | 'about.version-badge'
  | 'about.section.runtime'
  | 'about.runtime.dsh'
  | 'about.runtime.dsh-description'
  | 'about.runtime.package'
  | 'about.runtime.package-description'
  | 'about.section.components'
  | 'about.components.plugins'
  | 'about.components.plugins-description'
  | 'about.components.dependencies'
  | 'about.components.dependencies-description'
  | 'about.versions-empty'
  | 'about.section.update'
  | 'about.update-button'
  | 'about.update-hint'
  | 'about.update-state.checking'
  | 'about.update-state.up-to-date'
  | 'about.update-state.available'
  | 'about.update-state.open-updater'
  | 'about.update-state.downloading'
  | 'about.update-state.downloaded'
  | 'about.update-state.error'
  | 'about.footer.github'
  | 'about.footer.license'
  | 'about.footer.copyright'

export const ABOUT_MESSAGES: Record<'en' | 'zh', Record<AboutMessage, string>> = {
  en: {
    'about.title': 'About',
    'about.product-name': 'Oh-DSH',
    'about.product-subtitle': 'DeepSeek Harness Desktop',
    'about.version-badge': 'Version {version}',
    'about.section.runtime': 'Runtime',
    'about.runtime.dsh': 'DeepSeek Harness',
    'about.runtime.dsh-description': 'The upstream DSH release this surface runs on.',
    'about.runtime.package': 'DSH package',
    'about.runtime.package-description': 'npm identity of the pinned upstream release.',
    'about.section.components': 'Components',
    'about.components.plugins': 'Bundled plugins',
    'about.components.plugins-description': 'Built-in capability providers shipped with this build.',
    'about.components.dependencies': 'Dependencies',
    'about.components.dependencies-description': 'Key toolchain versions this build ships with.',
    'about.versions-empty': 'No entries recorded in this build.',
    'about.section.update': 'Software update',
    'about.update-button': 'Check for updates',
    'about.update-hint': 'Check for updates and open the update window.',
    'about.update-state.checking': 'Checking for updates...',
    'about.update-state.up-to-date': 'You are up to date.',
    'about.update-state.available': 'Version {version} is available.',
    'about.update-state.open-updater': 'Open updater',
    'about.update-state.downloading': 'Downloading in the update window...',
    'about.update-state.downloaded': 'Update ready — finish it in the update window.',
    'about.update-state.error': 'The last check failed. Try again.',
    'about.footer.github': 'GitHub',
    'about.footer.license': 'License',
    'about.footer.copyright': '© 2026 Oh-DSH Team. All rights reserved.',
  },
  zh: {
    'about.title': '关于',
    'about.product-name': 'Oh-DSH',
    'about.product-subtitle': 'DeepSeek Harness 桌面版',
    'about.version-badge': 'Version {version}',
    'about.section.runtime': '运行时信息',
    'about.runtime.dsh': 'DeepSeek Harness',
    'about.runtime.dsh-description': '当前 surface 运行所用的上游 DSH 固定版本。',
    'about.runtime.package': 'DSH 包',
    'about.runtime.package-description': '上游固定版本的 npm 包名。',
    'about.section.components': '组件',
    'about.components.plugins': '内置插件',
    'about.components.plugins-description': '随此构建一同发布的内置能力插件。',
    'about.components.dependencies': '依赖信息',
    'about.components.dependencies-description': '此构建所依赖的关键工具链版本。',
    'about.versions-empty': '此构建未记录任何条目。',
    'about.section.update': '软件更新',
    'about.update-button': '检查更新',
    'about.update-hint': '检查更新并打开更新窗口。',
    'about.update-state.checking': '正在检查更新…',
    'about.update-state.up-to-date': '已是最新版本。',
    'about.update-state.available': '发现新版本 {version}。',
    'about.update-state.open-updater': '打开更新',
    'about.update-state.downloading': '正在更新窗口中下载…',
    'about.update-state.downloaded': '更新已就绪——请在更新窗口中完成安装。',
    'about.update-state.error': '上次检查失败，请重试。',
    'about.footer.github': 'GitHub',
    'about.footer.license': '许可证',
    'about.footer.copyright': '© 2026 Oh-DSH Team. All rights reserved.',
  },
}
