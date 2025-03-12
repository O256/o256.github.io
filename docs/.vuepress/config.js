import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    base: '/docs/',
    title: 'OLIVER256的笔记',

    bundler: viteBundler(),
    theme: defaultTheme({
        logo: '/avatar.png',
        navbar: [
            {
                text: '主页',
                link: 'https://o256.github.io/',
            },
            {
                text: 'Redis',
                link: '/redis/basics/',
            },
            {
                text: 'Git',
                link: '/git/basics/',
            },
            {
                text: '优秀作文',
                link: '/essay/grade3/content/plants.md',
            },
            {
                text: 'Markdown',
                link: '/markdown/cheatsheet.md',
            },
            {
                text: 'Lua',
                link: '/lua/reference.md',
            },
        ],

        sidebar: {
            '/essay/': [
                {
                    text: '三年级',
                    link: '/essay/grade3/content/plants.md',
                    children: [
                        {
                            text: '优秀范文',
                            link: '/essay/grade3/content/plants.md',
                            children: [
                                '/essay/grade3/content/plants.md',
                                '/essay/grade3/content/animals.md',
                                '/essay/grade3/content/characters.md',
                            ]
                        },
                        {
                            text: '写作技巧',
                            link: '/essay/grade3/tips/structure.md',
                            children: [
                                '/essay/grade3/tips/structure.md',
                                '/essay/grade3/tips/rhetoric.md',
                                '/essay/grade3/tips/sensory.md',
                            ]
                        },
                    ],
                },
                {
                    text: '四年级',
                    link: '/essay/grade4/index.md',
                },
                {
                    text: '五年级',
                    link: '/essay/grade5/index.md',
                },
            ],
            '/markdown/': [
                {
                    text: 'Markdown',
                    link: '/markdown/cheatsheet.md',
                    children: [
                        {
                            text: '速查表',
                            link: '/markdown/cheatsheet.md',
                        },
                        {
                            text: '语法记录',
                            link: '/markdown/content.md',
                        },
                    ]
                },
            ],
            '/redis/': [
                {
                    text: 'Redis',
                    link: '/redis/basics/',
                },
            ],
            '/git/': [
                {
                    text: 'Git',
                    link: '/git/basics/',
                },
            ],
            '/lua/': [
                {
                    text: 'Lua',
                    link: '/lua/reference.md',
                    children: [
                        {
                            text: '参考手册',
                            link: '/lua/reference.md',
                        },
                    ],
                },
            ],
        },
    }),

    head: [
        ['link', { rel: 'icon', href: '/docs/avatar.png' }]
    ],
})