import Component from '@/component';
import GenerationPlov from '@/generation-plov';
import { VirtualDomNode } from '@/virtual-dom/types';

class Header extends Component<EmptyObject, { title: string }> {
  constructor(props: EmptyObject) {
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
    return GenerationPlov.elementFactory('div', { class: 'header' }, [
      String(this.state.title),
    ]);
  }
}

export default Header;
