
export const dict = [
    {
        key: "nature", value: [{
            value: '0',
            label: '个人使用'
        }, {
            value: '1',
            label: '政府使用'
        }, {
            value: '2',
            label: '公司使用'
        }, {
            value: '3',
            label: '商业使用'
        }, {
            value: '4',
            label: '其他'
        }]
    },
    {
        key: "status", value: [{
            value: '0',
            label: '维护中'
        }, {
            value: '1',
            label: '正常使用'
        }, {
            value: '2',
            label: '废弃'
        }]
    },
    {
        key: "YXstatus", value: [{
            value: '0',
            label: '预约中'
        }, {
            value: '1',
            label: '预约成功'
        }, {
            value: '2',
            label: '预约失败'
        }]
    },
    {
        key: "iconStatus", value: [{
            value: '0',
            label: 'info'
        }, {
            value: '1',
            label: 'success'
        }, {
            value: '2',
            label: 'error'
        }]
    },
    {
        key: "equipType", value: [{
            value: '0',
            label: '羽毛球拍'
        }, {
            value: '1',
            label: '羽毛球'
        }, {
            value: '2',
            label: '羽毛球网'
        }, {
            value: '3',
            label: '羽毛球训练器'
        }]
    },
    {
        key: "rentStatus", value: [{
            value: '0',
            label: '借出'
        }, {
            value: '1',
            label: '未借出'
        }]
    },
];

export default function getDictData (keys) {
    for (let item of dict) {
        if(item.key == keys){
            return item.value;
        }
    }
}


