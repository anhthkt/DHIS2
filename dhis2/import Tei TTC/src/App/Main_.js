import React from 'react';
import { Dropdown, Menu, Button} from 'antd';

const menu = (
    <Menu>
        <Menu.Item>
            <a href="#" onClick={() => import('./Main.js')}>
                Import
            </a>
        </Menu.Item>
    </Menu>
);
function Main() {
    return (
        <Dropdown overlay={menu} placement="bottomLeft">
            <Button>Select</Button>
        </Dropdown>
    );
}

export default Main;