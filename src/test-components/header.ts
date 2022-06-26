import Component from '@/component';
import elementFactory from '@/virtual-dom/element-factory';
import VirtualDomNode from '@/virtual-dom/virtual-dom-node';

class Header extends Component<Record<string, never>, { title: string }> {
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      title: 'Заголовок',
    };
  }

  public onCreateEnd(): void {
    setTimeout(() => {
      this.state.title = 'Обновленный заголовок спустя 5 секунд';
    }, 5000);
  }

  public render(): VirtualDomNode {
    return elementFactory('div', { class: 'header' }, [
      String(this.state.title),
    ]);
  }
}

export default Header;
