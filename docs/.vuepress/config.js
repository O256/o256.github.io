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
            }
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
        },
    }),

    head: [
        ['link', { rel: 'icon', href: '/docs/avatar.png' }]
    ],
})