import React from 'react';
import {Avatar, Form, Icon, Layout, Menu, Modal} from 'antd';
import '../assets/css/header.scss'
import App from '../common/App.jsx';
import AdminProfile from "./admin/AdminProfile";

const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            show_edit: false
        };
    }

    componentDidMount() {
        AdminProfile.get();
    }


    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        this.props.toggle && this.props.toggle();
    };

    logout = () => {
        Modal.confirm({
            title: '确定要退出吗?',
            content: null,
            onOk() {
                App.logout();
                App.go('/');
            },
            onCancel() {
            },
        });
    };

    showEdit = (val) => {
        this.setState({show_edit: val || false});
    };

    render() {
        return (<Header className='header-page'>
                <Icon className="trigger custom-trigger"
                      type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                      onClick={this.toggleCollapsed}/>

                <Menu className='header-top-bar'
                      mode="horizontal" style={{lineHeight: '65px', float: 'right'}}>
                    <SubMenu
                        title={<Avatar size={40} icon="user"/>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="pwd"><span>修改密码</span></Menu.Item>
                            <Menu.Item key="logout"><span>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>

            </Header>
        )
    }
}

export default Form.create()(HeaderCustom);
