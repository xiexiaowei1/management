import React, { Component } from 'react';
import { Icon, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import CTYPE from "../common/CTYPE";
import { Utils } from "../common";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderCustom extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
        openKey: '',
        selectedKey: '',

        firstHide: false
    };

    componentDidMount() {
        this.setMenuOpen();
    }

    componentWillReceiveProps(nextProps) {
        this.onCollapse(nextProps.collapsed);
    }

    getPostion = (str, cha, num) => {
        let x = str.indexOf(cha);
        for (let i = 0; i < num; i++) {
            x = str.indexOf(cha, x + 1);
        }
        return x;
    };

    setMenuOpen = () => {

        let path = window.location.hash.split('#')[1];

        //兼容三层目录,三级页不修改，刷新时定位到一级
        let key = path.substr(0, path.lastIndexOf('/'));
        if (key.split('/').length > 3) {
            if (this.state.openKey)
                return;
            key = key.substring(0, this.getPostion(key, '/', 2));
        }

        this.setState({
            openKey: key,
            selectedKey: path
        });
    };

    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline'
        });
    };

    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });

    };
    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false
        });
    };

    render() {

        let {
            ADMIN_LIST,

        } = Utils.adminPermissions;

        let withAdmin = ADMIN_LIST

        let { firstHide, selectedKey, openKey } = this.state;

        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={this.props.collapsed}
                style={{ overflowY: 'auto' }}>
                <div className={this.props.collapsed ? 'logo logo-s' : 'logo'} />
                <Menu onClick={this.menuClick}
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    openKeys={firstHide ? null : [openKey]}
                    onOpenChange={this.openMenu}>
                    <Menu.Item key="/app/dashboard/index">
                        <Link to={'/app/dashboard/index'}><Icon type="home" /><span
                            className="nav-text">首页</span></Link>
                    </Menu.Item>

                    <SubMenu key='/app/admin'
                        title={<span><Icon type="usergroup-add" /><span
                            className="nav-text">管理&权限</span></span>}>
                    </SubMenu>

                </Menu>
            </Sider>
        );
    }
}

export default SiderCustom;