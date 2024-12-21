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
                text: 'Redis',
                children: [
                    {
                        text: '教程',
                        link: '/redis/basics/',
                    },
                    {
                        text: '剖析',
                        link: '/redis/source/',
                    },
                    {
                        text: '注释',
                        link: 'https://github.com/O256/redis',
                    }
                ],
            },
            {
                text: 'Git',
                children: [
                    {
                        text: '教程',
                        link: '/git/basics/',
                    },
                    {
                        text: '剖析',
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