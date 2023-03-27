# :apple: MAC-OS 스타일의 게시판 웹앱
### macOS를 사용하는 듯한 UX/UI를 기반으로 게시판 웹앱을 만드는 리포지토리
## 목표

:one:싱글 페이지, 웹앱으로서 macOS의 UX/UI를 따라 구현해 봄으로, 구현력과 유저 경험에 대한 이해도를 높이기

:two:게시판 페이지도 자기의 역할(CRUD)에 충실 하도록 할 것

#

SEO가 크게 중요하지 않은, SPA(Single Page Application)을 제작 할 예정이라 React에 에러를 최소화하기 위한 Typescript를 채택하였습니다.

스타일링은 Styled-components와 TailwindCss 두 가지를 고민해보았는데, Tailwind가 굉장히 간편하면서도 반응형이라는 장점이 있지만, 클래스명이 길어진다는 단점이 있습니다. 그래서 코드가 길어지더라도 기능 구현 부분에서 스타일링을 따로 분리해 가독성을 높이기 위해 Styled-components를 채택하였습니다.

macOS를 지향하고 있지만, 모바일 환경에서의 유저 경험은 상이한 부분이 있기 때문에, 모바일도 그에 맞는 유저 경험으로 반응하도록 할 예정입니다.

백엔드 작업은 firebase를 연동시킬 예정이고, 게시판은 익명으로도 글을 작성 할 수 있지만, 회원은 등급을 부여하고, 게시글에 특별한 스타일링을 적용할 예정입니다.

#

어플리케이션 창은 react portal로 모달창 형식으로 구현했으며, Drag-and-Drop으로 위치를 옮길 수 있게 해서 실제 앱을 실행하는듯한 UX를 만들었습니다. (resize도 구현 예정)

### React Portal을 활용한 모달 창은 재사용을 위해 Custom Hook으로 만들어 관리하였습니다.

```
const useModal = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  interface IProps {
    children: React.ReactNode;
  }

  const ModalPortal: React.FC<IProps> = ({ children }) => {
    const ref = useRef<Element | null>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      if (document) {
        const dom = document.querySelector("#root-modal");
        ref.current = dom;
      }
    }, []);
    
    if (ref.current && mounted && modalOpened) {
      return createPortal(
        <Container mounted={mounted}>
          {children}
        </Container>,
        ref.current
      );
    }
    return null;
  };

  return {
    openModal,
    closeModal,
    ModalPortal,
  };
};
```

Drag 이벤트는 이 블로그(https://bepyan.github.io/blog/dnd-master/1-drag-event)를 참조하였으며 drag 특성 상, 너무 잦은 리렌더링이 일어나 리소스가 낭비되므로,

lodash의 throttle을 이용하여 통상적으로 사용하는 모니터 60hz 주사율에 맞춰 값을 받아오도록 최적화 하였습니다.

```
const [{ x, y }, setPosition] = useState({
  x: 0,
  y: 0,
});

const inrange = (v: number, min: number, max: number) => {
  if (v < min) return min;
  if (v > max) return max;
  return v;
};

const modalPositionHandler = (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
  const mouseMoveHandler = throttle((moveEvent: MouseEvent) => {
    const deltaX = moveEvent.screenX - clickEvent.screenX;
    const deltaY = moveEvent.screenY - clickEvent.screenY;

    const browser = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    const app = appRef.current?.getBoundingClientRect()

    setPosition({
      x: inrange(
        x + deltaX,
        Math.floor((-browser.width + app!.width) / 2),
        Math.floor((browser.width - app!.width) / 2),
      ),
      y: inrange(
        y + deltaY,
        // 메뉴 바를 제외한 높이
        Math.floor((-browser.height + app!.height + 25) / 2),
        Math.floor((browser.height - app!.height - 25) / 2),
      )
    });
  }, 16); // 60fps

  const mouseUpHandler = () => {
    document.removeEventListener('mousemove', mouseMoveHandler);
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler, { once: true });
}
```