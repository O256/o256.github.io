import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    base: '/docs/',
    title: 'docs',

    bundler: viteBundler(),
    theme: defaultTheme({
        logo: '/avatar.png',
        navbar: [
            {
                text: '首页',
                link: '/',
            },
            {
                text: 'Redis',
                children: [
                    {
                        text: '基础概念',
                        link: '/redis/basics/',
                    },
                    {
                        text: '高级特性',
                        link: '/redis/advanced/',
                    },
                    {
                        text: '源码剖析',
                        link: '/redis/source/',
                    },
                ],
            },
        ],
    }),

    head: [
        ['link', { rel: 'icon', href: '/docs/avatar.png' }]
    ],
})