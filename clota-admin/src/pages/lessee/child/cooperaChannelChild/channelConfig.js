

//获取详情字段信息
export default function (type,...rest) {
    if (type === 'org') {
        return [
            [
                {
                    label : '联系人',
                    value : rest[0]
                },
                {
                    label : '联系方式',
                    value : rest[1]
                },
                {
                    label : '管理账号',
                    value : rest[2]
                }
            ],
            [
                {
                    label : '社会信用代码',
                    value : rest[3]
                },
                {
                    label : '所在地',
                    value : rest[4]
                },
                {
                    label : '详细地址',
                    value : rest[5]
                }
            ],
            [
                {
                    label : '电子邮箱',
                    value : rest[6]
                },
                {
                    label : '账号申请时间',
                    value : rest[7]
                },
                {
                    label : '受理客服',
                    value : rest[8]
                }
            ],
            [
                {
                    label : '上次修改时间',
                    value : rest[9]
                },
                {
                    label : '注册审核时间',
                    value : rest[10]
                },
                {
                    label : '上次修改人',
                    value : rest[11]
                }
            ],
            [
                {
                    label : '备注',
                    value : rest[12]
                },
                {
                    label : '营业执照',
                    value : rest[13] ? JSON.parse(rest[13]) : []
                }
            ]
        ];
    } else {
        return [
            [
                {
                    label : '身份证号',
                    value : rest[0]
                },
                {
                    label : '联系方式',
                    value : rest[1]
                },
                {
                    label : '管理账号',
                    value : rest[2]
                }
            ],
            [
                {
                    label : '电子邮箱',
                    value : rest[3]
                },
                {
                    label : '所在地',
                    value : rest[4]
                },
                {
                    label : '详细地址',
                    value : rest[5]
                }
            ],
            [
                {
                    label : '受理客服',
                    value : rest[6]
                },
                {
                    label : '账号申请时间',
                    value : rest[7]
                },
                {
                    label : '上次修改时间',
                    value : rest[8]
                },
            ],
            [
                {
                    label : '注册审核时间',
                    value : rest[9]
                },
                {
                    label : '上次修改人',
                    value : rest[10]
                },
                {}
            ],
            [
                {
                    label : '备注',
                    value : rest[11]
                },
                {
                    label : '身份证',
                    value : rest[12] ? JSON.parse(rest[12]) : []
                }
            ]
        ];
    }
}
