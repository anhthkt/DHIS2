import { Row, Col, Button } from 'antd';

function Header({ activeMenu, onMenuClick }) {
  return (
    <div className="header">
      <Row justify="space-around">
        <Col span={2}>
          <Button
            type={activeMenu === 'menu1' ? 'primary' : 'default'}
            onClick={() => onMenuClick('menu1')}
          >
            Bước 1. Chọn chương trình
          </Button>
        </Col>
        <Col span={2}>
          <Button
            type={activeMenu === 'menu2' ? 'primary' : 'default'}
            onClick={() => onMenuClick('menu2')}
          >
            Bước 2. Tải file excel import
          </Button>
        </Col>
        <Col span={2}>
          <Button
            type={activeMenu === 'menu3' ? 'primary' : 'default'}
            onClick={() => onMenuClick('menu3')}
          >
            Bước 3. Import dữ liệu
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
