import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    base: '/docs/',
    title: 'docs',
    avatar: '/docs/avatar.png',

    bundler: viteBundler(),
    theme: defaultTheme(),

    head: [
        ['link', { rel: 'icon', href: '/docs/avatar.png' }]
    ],
})