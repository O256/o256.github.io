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
            {
                text: '优秀作文',
                children: [
                    {
                        text: '三年级',
                        link: '/essay/grade3/content/plants.md',
                    },
                    {
                        text: '四年级',
                        link: '/essay/grade4/content/animals.md',
                    },
                    {
                        text: '五年级',
                        link: '/essay/grade5/content/animals.md',
                    },
                ],
            },
            {
                text: 'Markdown',
                link: '/markdown/cheatsheet.md',
            },
        ],

        sidebar: {
            '/essay/grade3/': [
                {
                    text: '三年级',
                    link: '/essay/grade3/content/plants.md',
                    children: [
                        {
                            text: '优秀范文',
                            link: '/essay/grade3/content/plants.md',
                            children: [
                                '/essay/grade3/content/animals.md',
                                '/essay/grade3/content/characters.md',
                                '/essay/grade3/content/plants.md',
                            ]
                        },
                        {
                            text: '写作技巧',
                            link: '/essay/grade3/tips/structure.md',
                            children: [
                                '/essay/grade3/tips/structure.md',
                            ]
                        },
                    ],
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
        },
    }),

    head: [
        ['link', { rel: 'icon', href: '/docs/avatar.png' }]
    ],
})