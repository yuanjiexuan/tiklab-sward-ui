import Mock from "mockjs";
var data = {
        time: "2021.3",
        2: {
            28: [
                {
                    name: "事项1",
                    id: "00001"
                },
                {
                    name: "事项2",
                    id: "00002"
                },
                {
                    name: "事项3",
                    id: "00003"
                },
                {
                    name: "事项4",
                    id: "00004"
                },
                {
                    name: "事项5",
                    id: "00005"
                },
                {
                    name: "事项6",
                    id: "00006"
                },
            ]
        },
        3: 
            {
                1: [
                {
                    name: "事项1",
                    id: "00001"
                },
                {
                    name: "事项2",
                    id: "00002"
                },
                {
                    name: "事项3",
                    id: "00003"
                },
                {
                    name: "事项4",
                    id: "00004"
                },
                {
                    name: "事项5",
                    id: "00005"
                },
                {
                    name: "事项6",
                    id: "00006"
                },
                ],
                2: [
                    {
                        name: "事项1",
                        id: "00001"
                    },
                    {
                        name: "事项2",
                        id: "00002"
                    },
                    {
                        name: "事项3",
                        id: "00003"
                    },
                    {
                        name: "事项4",
                        id: "00004"
                    },
                    {
                        name: "事项5",
                        id: "00005"
                    },
                    {
                        name: "事项6",
                        id: "00006"
                    },
                ],
                3: [
                    {
                        name: "事项1",
                        id: "00001"
                    },
                    {
                        name: "事项2",
                        id: "00002"
                    },
                    {
                        name: "事项3",
                        id: "00003"
                    },
                    {
                        name: "事项4",
                        id: "00004"
                    },
                    {
                        name: "事项5",
                        id: "00005"
                    },
                    {
                        name: "事项6",
                        id: "00006"
                    },
                ],
                4: [],
                5: [],
                6: [],
                7: [],
                8: [],
                9: [],
                10: [],
                11: [],
                12: [],
                13: [],
                14: [],
                15: [],
                16: [],
                17: [],
                18: [],
                19: [],
                20: [],
                21: [],
                22: [],
                23: [],
                24: [],
                25: [],
                26: [],
                27: [],
                28: []
            }
        ,
        4: {
            1: [ 
                {
                    name: "事项1",
                    id: "00001"
                },
                {
                    name: "事项2",
                    id: "00002"
                },
                {
                    name: "事项3",
                    id: "00003"
                },
                {
                    name: "事项4",
                    id: "00004"
                },
                {
                    name: "事项5",
                    id: "00005"
                },
                {
                    name: "事项6",
                    id: "00006"
                },
            ],
            2: [
                {
                    name: "事项1",
                    id: "00001"
                },
                {
                    name: "事项2",
                    id: "00002"
                },
                {
                    name: "事项3",
                    id: "00003"
                },
                {
                    name: "事项4",
                    id: "00004"
                },
                {
                    name: "事项5",
                    id: "00005"
                },
                {
                    name: "事项6",
                    id: "00006"
                },
            ],
            3: [
                {
                    name: "事项1",
                    id: "00001"
                },
                {
                    name: "事项2",
                    id: "00002"
                },
                {
                    name: "事项3",
                    id: "00003"
                },
                {
                    name: "事项4",
                    id: "00004"
                },
                {
                    name: "事项5",
                    id: "00005"
                },
                {
                    name: "事项6",
                    id: "00006"
                },
            ],
            4: [],
            5: [],
            6: [],
        }
    };
Mock.mock("/calendar", { data });

var dayData = [
    {
        data: [
            {
                name: "事项1",
                id: "000001",
                startTime: "2021-02-09 9:00",
                endTime: "2021-02-09 16:00"
            },
            {
                name: "事项2",
                id: "000002",
                startTime: "2021-02-09 16:00",
                endTime: "2021-02-09 17:00"
            }

        ]
    },
    {
        data: [
            {
                name: "事项3",
                id: "000003",
                startTime: "2021-02-09 11:00",
                endTime: "2021-02-09 16:00"
            },
        ]
    },
    {
        data: [
            {
                name: "事项4",
                id: "000004",
                startTime: "2021-02-09 9:00",
                endTime: "2021-02-09 10:00"
            },
            {
                name: "事项5",
                id: "000005",
                startTime: "2021-02-09 10:00",
                endTime: "2021-02-09 12:00"
            },

        ]
    },
    {
        data: [
            {
                name: "事项6",
                id: "000006",
                startTime: "2021-02-09 6:00",
                endTime: "2021-02-09 10:00"
            },
            {
                name: "事项7",
                id: "000007",
                startTime: "2021-02-09 14:00",
                endTime: "2021-02-09 19:00"
            },

        ]
    },
]

Mock.mock("/calendarDay", { dayData });

var weekData = [
    {
        data: [
            {
                data: [
                    {
                        name: "事项0",
                        id: "000000",
                        startTime: "2021-02-09 06:00",
                        endTime: "2021-02-09 09:00"
                    },
                    {
                        name: "事项1",
                        id: "000001",
                        startTime: "2021-02-09 9:00",
                        endTime: "2021-02-09 15:00"
                    },
                    {
                        name: "事项2",
                        id: "000002",
                        startTime: "2021-02-09 16:00",
                        endTime: "2021-02-09 17:00"
                    }
        
                ]
            },
            {
                data: [
                    {
                        name: "事项3",
                        id: "000003",
                        startTime: "2021-02-09 05:00",
                        endTime: "2021-02-09 08:00"
                    },
                    {
                        name: "事项4",
                        id: "000004",
                        startTime: "2021-02-09 11:00",
                        endTime: "2021-02-09 16:00"
                    },
                ]
            },
            {
                data: [
                    {
                        name: "事项4",
                        id: "000004",
                        startTime: "2021-02-09 3:00",
                        endTime: "2021-02-09 10:00"
                    },
                    {
                        name: "事项5",
                        id: "000005",
                        startTime: "2021-02-09 10:00",
                        endTime: "2021-02-09 12:00"
                    },
        
                ]
            },
            {
                data: [
                    {
                        name: "事项6",
                        id: "000006",
                        startTime: "2021-02-09 6:00",
                        endTime: "2021-02-09 10:00"
                    },
                    {
                        name: "事项7",
                        id: "000007",
                        startTime: "2021-02-09 10:00",
                        endTime: "2021-02-09 19:00"
                    },
                    {
                        name: "事项8",
                        id: "000008",
                        startTime: "2021-02-09 19:00",
                        endTime: "2021-02-09 23:00"
                    },
        
                ]
            },
        ]
    },
    {
        data: [
            {
                data: [
                    {
                        name: "事项1",
                        id: "000001",
                        startTime: "2021-02-09 9:00",
                        endTime: "2021-02-09 16:00"
                    },
                    {
                        name: "事项2",
                        id: "000002",
                        startTime: "2021-02-09 16:00",
                        endTime: "2021-02-09 17:00"
                    }
        
                ]
            },
            {
                data: [
                    {
                        name: "事项3",
                        id: "000003",
                        startTime: "2021-02-09 11:00",
                        endTime: "2021-02-09 16:00"
                    },
                ]
            },
            {
                data: [
                    {
                        name: "事项4",
                        id: "000004",
                        startTime: "2021-02-09 9:00",
                        endTime: "2021-02-09 10:00"
                    },
                    {
                        name: "事项5",
                        id: "000005",
                        startTime: "2021-02-09 10:00",
                        endTime: "2021-02-09 12:00"
                    },
        
                ]
            },
            {
                data: [
                    {
                        name: "事项6",
                        id: "000006",
                        startTime: "2021-02-09 6:00",
                        endTime: "2021-02-09 10:00"
                    },
                    {
                        name: "事项7",
                        id: "000007",
                        startTime: "2021-02-09 14:00",
                        endTime: "2021-02-09 19:00"
                    },
        
                ]
            },
        ]
    },
    {
        data: [
            {
                data: [
                    {
                        name: "事项1",
                        id: "000001",
                        startTime: "2021-02-09 9:00",
                        endTime: "2021-02-09 16:00"
                    },
                    {
                        name: "事项2",
                        id: "000002",
                        startTime: "2021-02-09 16:00",
                        endTime: "2021-02-09 17:00"
                    },
                    {
                        name: "事项3",
                        id: "000003",
                        startTime: "2021-02-09 17:00",
                        endTime: "2021-02-09 18:00"
                    }
        
                ]
            },
            {
                data: [
                    {
                        name: "事项4",
                        id: "000004",
                        startTime: "2021-02-09 11:00",
                        endTime: "2021-02-09 16:00"
                    },
                    {
                        name: "事项5",
                        id: "000005",
                        startTime: "2021-02-09 16:00",
                        endTime: "2021-02-09 19:00"
                    },
                ]
            },
            {
                data: [
                    {
                        name: "事项6",
                        id: "000006",
                        startTime: "2021-02-09 9:00",
                        endTime: "2021-02-09 10:00"
                    },
                    {
                        name: "事项7",
                        id: "000007",
                        startTime: "2021-02-09 10:00",
                        endTime: "2021-02-09 12:00"
                    },
        
                ]
            },
            {
                data: [
                    {
                        name: "事项8",
                        id: "000008",
                        startTime: "2021-02-09 6:00",
                        endTime: "2021-02-09 10:00"
                    },
                    {
                        name: "事项9",
                        id: "000009",
                        startTime: "2021-02-09 14:00",
                        endTime: "2021-02-09 19:00"
                    },
        
                ]
            },
        ]
    },
    {
        data: [
            {
                data: [
                    {
                        name: "事项1",
                        id: "000001",
                        startTime: "2021-02-09 9:00",
                        endTime: "2021-02-09 16:00"
                    },
                    {
                        name: "事项2",
                        id: "000002",
                        startTime: "2021-02-09 16:00",
                        endTime: "2021-02-09 17:00"
                    },
                    {
                        name: "事项3",
                        id: "000003",
                        startTime: "2021-02-09 17:00",
                        endTime: "2021-02-09 18:00"
                    }
        
                ]
            },
            {
                data: [
                    {
                        name: "事项4",
                        id: "000004",
                        startTime: "2021-02-09 11:00",
                        endTime: "2021-02-09 16:00"
                    },
                    {
                        name: "事项5",
                        id: "000005",
                        startTime: "2021-02-09 16:00",
                        endTime: "2021-02-09 19:00"
                    },
                ]
            },
            {
                data: [
                    {
                        name: "事项6",
                        id: "000006",
                        startTime: "2021-02-09 9:00",
                        endTime: "2021-02-09 10:00"
                    },
                    {
                        name: "事项7",
                        id: "000007",
                        startTime: "2021-02-09 10:00",
                        endTime: "2021-02-09 12:00"
                    },
        
                ]
            },
            {
                data: [
                    {
                        name: "事项8",
                        id: "000008",
                        startTime: "2021-02-09 6:00",
                        endTime: "2021-02-09 10:00"
                    },
                    {
                        name: "事项9",
                        id: "000009",
                        startTime: "2021-02-09 14:00",
                        endTime: "2021-02-09 19:00"
                    },
        
                ]
            },
        ]
    },
    {
        data: [
            {
                data: [
                    {
                        name: "事项1",
                        id: "000001",
                        startTime: "2021-02-09 9:00",
                        endTime: "2021-02-09 16:00"
                    },
                    {
                        name: "事项2",
                        id: "000002",
                        startTime: "2021-02-09 16:00",
                        endTime: "2021-02-09 17:00"
                    },
                    {
                        name: "事项3",
                        id: "000003",
                        startTime: "2021-02-09 17:00",
                        endTime: "2021-02-09 18:00"
                    }
        
                ]
            },
            {
                data: [
                    {
                        name: "事项4",
                        id: "000004",
                        startTime: "2021-02-09 11:00",
                        endTime: "2021-02-09 16:00"
                    },
                    {
                        name: "事项5",
                        id: "000005",
                        startTime: "2021-02-09 16:00",
                        endTime: "2021-02-09 19:00"
                    },
                ]
            },
            {
                data: [
                    {
                        name: "事项6",
                        id: "000006",
                        startTime: "2021-02-09 9:00",
                        endTime: "2021-02-09 10:00"
                    },
                    {
                        name: "事项7",
                        id: "000007",
                        startTime: "2021-02-09 10:00",
                        endTime: "2021-02-09 12:00"
                    },
        
                ]
            },
            {
                data: [
                    {
                        name: "事项8",
                        id: "000008",
                        startTime: "2021-02-09 6:00",
                        endTime: "2021-02-09 10:00"
                    },
                    {
                        name: "事项9",
                        id: "000009",
                        startTime: "2021-02-09 14:00",
                        endTime: "2021-02-09 19:00"
                    },
        
                ]
            },
        ]
    },
    {
        data: [
            {
                data: [
                    {
                        name: "事项1",
                        id: "000001",
                        startTime: "2021-02-09 9:00",
                        endTime: "2021-02-09 16:00"
                    },
                    {
                        name: "事项2",
                        id: "000002",
                        startTime: "2021-02-09 16:00",
                        endTime: "2021-02-09 17:00"
                    },
                    {
                        name: "事项3",
                        id: "000003",
                        startTime: "2021-02-09 17:00",
                        endTime: "2021-02-09 18:00"
                    }
        
                ]
            },
            {
                data: [
                    {
                        name: "事项4",
                        id: "000004",
                        startTime: "2021-02-09 11:00",
                        endTime: "2021-02-09 16:00"
                    },
                    {
                        name: "事项5",
                        id: "000005",
                        startTime: "2021-02-09 16:00",
                        endTime: "2021-02-09 19:00"
                    },
                ]
            },
            {
                data: [
                    {
                        name: "事项6",
                        id: "000006",
                        startTime: "2021-02-09 9:00",
                        endTime: "2021-02-09 10:00"
                    },
                    {
                        name: "事项7",
                        id: "000007",
                        startTime: "2021-02-09 10:00",
                        endTime: "2021-02-09 12:00"
                    },
        
                ]
            },
            {
                data: [
                    {
                        name: "事项8",
                        id: "000008",
                        startTime: "2021-02-09 6:00",
                        endTime: "2021-02-09 10:00"
                    },
                    {
                        name: "事项9",
                        id: "000009",
                        startTime: "2021-02-09 14:00",
                        endTime: "2021-02-09 19:00"
                    },
        
                ]
            },
        ]
    },
    {
        data: [
            {
                data: [
                    {
                        name: "事项1",
                        id: "000001",
                        startTime: "2021-02-09 9:00",
                        endTime: "2021-02-09 16:00"
                    },
                    {
                        name: "事项2",
                        id: "000002",
                        startTime: "2021-02-09 16:00",
                        endTime: "2021-02-09 17:00"
                    },
                    {
                        name: "事项3",
                        id: "000003",
                        startTime: "2021-02-09 17:00",
                        endTime: "2021-02-09 18:00"
                    }
        
                ]
            },
            {
                data: [
                    {
                        name: "事项4",
                        id: "000004",
                        startTime: "2021-02-09 11:00",
                        endTime: "2021-02-09 16:00"
                    },
                    {
                        name: "事项5",
                        id: "000005",
                        startTime: "2021-02-09 16:00",
                        endTime: "2021-02-09 19:00"
                    },
                ]
            },
            {
                data: [
                    {
                        name: "事项6",
                        id: "000006",
                        startTime: "2021-02-09 9:00",
                        endTime: "2021-02-09 10:00"
                    },
                    {
                        name: "事项7",
                        id: "000007",
                        startTime: "2021-02-09 10:00",
                        endTime: "2021-02-09 12:00"
                    },
        
                ]
            },
            {
                data: [
                    {
                        name: "事项8",
                        id: "000008",
                        startTime: "2021-02-09 6:00",
                        endTime: "2021-02-09 10:00"
                    },
                    {
                        name: "事项9",
                        id: "000009",
                        startTime: "2021-02-09 14:00",
                        endTime: "2021-02-09 19:00"
                    },
        
                ]
            },
        ]
    }
]
Mock.mock("/calendarWeek", { weekData });