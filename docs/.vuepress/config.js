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
                        text:  '基础使用',
                        link: '/redis/basics/',
                    },
                    {
                        text: '源码剖析',
                        link: '/redis/source/',
                    },
                ],
            },
            {
                text: 'Git',
                children: [
                    {
                        text: '基础使用',
                        link: '/git/basics/',
                    },
                    {
                        text: '源码剖析',
                        link: '/git/source/',
                    }
                ],
            },
        ],
    }),

    head: [
        ['link', { rel: 'icon', href: '/docs/avatar.png' }]
    ],
})