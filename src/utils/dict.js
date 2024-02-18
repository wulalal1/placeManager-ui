
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
            label: '其他租用'
        }]
    },
    {
        key: "status", value: [{
            value: '0',
            label: '未使用'
        }, {
            value: '1',
            label: '使用中'
        }, {
            value: '2',
            label: '以预约'
        }, {
            value: '3',
            label: '废弃'
        }]
    },
    {
        key: "YXstatus", value: [{
            value: '0',
            label: '未审批'
        }, {
            value: '1',
            label: '审批通过'
        }, {
            value: '2',
            label: '审批驳回'
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


