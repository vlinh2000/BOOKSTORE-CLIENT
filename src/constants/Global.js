
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Logo from 'assets/images/logo.png';
import Paymet from 'assets/images/paymetFooter.png';


const columnShoppingCartTab = [
    {
        title: 'product',
        dataIndex: 'product',
        key: 'product',
    },
    {
        title: 'price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'subtotal',
        dataIndex: 'subtotal',
        key: 'subtotal',
    },
    {
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: () => <Button type='text'><DeleteOutlined /></Button>
    }
];



export { Logo, Paymet, columnShoppingCartTab };