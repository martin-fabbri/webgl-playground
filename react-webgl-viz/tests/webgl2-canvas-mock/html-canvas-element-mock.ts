import CanvasRenderingContext2DMock from './canvas-rendering-context-2d-mock';
import WebGL2RenderingContextMock from './webgl2-rendering-context-mock';

class HTMLCanvaElementMock implements HTMLCanvasElement {
    public height: number;
    public width: number;

    public readonly after: any;
    public readonly before: any;
    public readonly replaceWith: any;
    public readonly ATTRIBUTE_NODE: number = -1;
    public readonly CDATA_SECTION_NODE: number = -1;
    public readonly COMMENT_NODE: number = -1;
    public readonly DOCUMENT_FRAGMENT_NODE: number = -1;
    public readonly DOCUMENT_NODE: number = -1;
    public readonly DOCUMENT_POSITION_CONTAINED_BY: number = -1;
    public readonly DOCUMENT_POSITION_CONTAINS: number = -1;
    public readonly DOCUMENT_POSITION_DISCONNECTED: number = -1;
    public readonly DOCUMENT_POSITION_FOLLOWING: number = -1;
    public readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number = -1;
    public readonly DOCUMENT_POSITION_PRECEDING: number = -1;
    public readonly DOCUMENT_TYPE_NODE: number = -1;
    public readonly ELEMENT_NODE: number = -1;
    public readonly ENTITY_NODE: number = -1;
    public readonly ENTITY_REFERENCE_NODE: number = -1;
    public readonly NOTATION_NODE: number = -1;
    public readonly PROCESSING_INSTRUCTION_NODE: number = -1;
    public readonly TEXT_NODE: number = -1;
    public accessKey: string = '';
    public readonly assignedSlot: HTMLSlotElement | null = null;
    // @ts-ignore
    public readonly attributes: NamedNodeMap;
    public readonly baseURI: string | null = null;
    public readonly childElementCount: number = -1;
    // @ts-ignore
    public readonly childNodes: NodeListOf<Node & ChildNode>;
    // @ts-ignore
    public readonly children: HTMLCollection;
    // @ts-ignore
    public readonly classList: DOMTokenList;
    public className: string = '';
    public readonly clientHeight: number = -1;
    public readonly clientLeft: number = -1;
    public readonly clientTop: number = -1;
    public readonly clientWidth: number = -1;
    public contentEditable: string = '';
    // @ts-ignore
    public readonly dataset: DOMStringMap;
    public dir: string = '';
    public draggable: boolean = false;
    public readonly firstChild: Node | null = null;
    public readonly firstElementChild: Element | null = null;
    public hidden: boolean = false;
    public hideFocus: boolean = false;
    public id: string = '';
    public innerHTML: string = '';
    public innerText: string = '';
    public readonly isConnected: boolean = false;
    public readonly isContentEditable: boolean = false;
    public lang: string = '';
    public readonly lastChild: Node | null = null;
    public readonly lastElementChild: Element | null = null;
    public readonly localName: string | null = null;
    public msContentZoomFactor: number = -1;
    public readonly msRegionOverflow: string = '';
    public readonly namespaceURI: string | null = null;
    public readonly nextElementSibling: Element | null = null;
    public readonly nextSibling: Node | null = null;
    public readonly nodeName: string = '';
    public readonly nodeType: number = -1;
    public nodeValue: string | null = null;
    public readonly offsetHeight: number = -1;
    public readonly offsetLeft: number = -1;
    // @ts-ignore
    public readonly offsetParent: Element;
    public readonly offsetTop: number = -1;
    public readonly offsetWidth: number = -1;
    public onabort: ((ev: UIEvent) => any) | null = null;
    public public: ((ev: Event) => any) | null = null;
    public onariarequest: ((ev: Event) => any) | null = null;
    public onbeforeactivate: ((ev: Event) => any) | null = null;
    public onbeforecopy: ((ev: Event) => any) | null = null;
    public onbeforecut: ((ev: Event) => any) | null = null;
    public onbeforedeactivate: ((ev: Event) => any) | null = null;
    public onbeforepaste: ((ev: Event) => any) | null = null;
    public onblur: ((ev: FocusEvent) => any) | null = null;
    public oncanplay: ((ev: Event) => any) | null = null;
    public oncanplaythrough: ((ev: Event) => any) | null = null;
    public onchange: ((ev: Event) => any) | null = null;
    public onclick: ((ev: MouseEvent) => any) | null = null;
    public oncommand: ((ev: Event) => any) | null = null;
    public oncontextmenu: ((ev: PointerEvent) => any) | null = null;
    public oncopy: ((ev: ClipboardEvent) => any) | null = null;
    public oncuechange: ((ev: Event) => any) | null = null;
    public oncut: ((ev: ClipboardEvent) => any) | null = null;
    public ondblclick: ((ev: MouseEvent) => any) | null = null;
    public ondeactivate: ((ev: Event) => any) | null = null;
    public ondrag: ((ev: DragEvent) => any) | null = null;
    public ondragend: ((ev: DragEvent) => any) | null = null;
    public ondragenter: ((ev: DragEvent) => any) | null = null;
    public ondragleave: ((ev: DragEvent) => any) | null = null;
    public ondragover: ((ev: DragEvent) => any) | null = null;
    public ondragstart: ((ev: DragEvent) => any) | null = null;
    public ondrop: ((ev: DragEvent) => any) | null = null;
    public ondurationchange: ((ev: Event) => any) | null = null;
    public onemptied: ((ev: Event) => any) | null = null;
    public onended: ((ev: Event) => any) | null = null;
    public onerror: ((ev: ErrorEvent) => any) | null = null;
    public onfocus: ((ev: FocusEvent) => any) | null = null;
    public ongotpointercapture: ((ev: PointerEvent) => any) | null = null;
    public oninput: ((ev: Event) => any) | null = null;
    public oninvalid: ((ev: Event) => any) | null = null;
    public onkeydown: ((ev: KeyboardEvent) => any) | null = null;
    public onkeypress: ((ev: KeyboardEvent) => any) | null = null;
    public onkeyup: ((ev: KeyboardEvent) => any) | null = null;
    public onload: ((ev: Event) => any) | null = null;
    public onloadeddata: ((ev: Event) => any) | null = null;
    public onloadedmetadata: ((ev: Event) => any) | null = null;
    public onloadstart: ((ev: Event) => any) | null = null;
    public onlostpointercapture: ((ev: PointerEvent) => any) | null = null;
    public onmousedown: ((ev: MouseEvent) => any) | null = null;
    public onmouseenter: ((ev: MouseEvent) => any) | null = null;
    public onmouseleave: ((ev: MouseEvent) => any) | null = null;
    public onmousemove: ((ev: MouseEvent) => any) | null = null;
    public onmouseout: ((ev: MouseEvent) => any) | null = null;
    public onmouseover: ((ev: MouseEvent) => any) | null = null;
    public onmouseup: ((ev: MouseEvent) => any) | null = null;
    public onmousewheel: ((ev: WheelEvent) => any) | null = null;
    public onmscontentzoom: ((ev: Event) => any) | null = null;
    public onmsgesturechange: ((ev: Event) => any) | null = null;
    public onmsgesturedoubletap: ((ev: Event) => any) | null = null;
    public onmsgestureend: ((ev: Event) => any) | null = null;
    public onmsgesturehold: ((ev: Event) => any) | null = null;
    public onmsgesturestart: ((ev: Event) => any) | null = null;
    public onmsgesturetap: ((ev: Event) => any) | null = null;
    public onmsgotpointercapture: ((ev: Event) => any) | null = null;
    public onmsinertiastart: ((ev: Event) => any) | null = null;
    public onmslostpointercapture: ((ev: Event) => any) | null = null;
    public onmsmanipulationstatechanged: ((ev: Event) => any) | null = null;
    public onmspointercancel: ((ev: Event) => any) | null = null;
    public onmspointerdown: ((ev: Event) => any) | null = null;
    public onmspointerenter: ((ev: Event) => any) | null = null;
    public onmspointerleave: ((ev: Event) => any) | null = null;
    public onmspointermove: ((ev: Event) => any) | null = null;
    public onmspointerout: ((ev: Event) => any) | null = null;
    public onmspointerover: ((ev: Event) => any) | null = null;
    public onmspointerup: ((ev: Event) => any) | null = null;
    public onpaste: ((ev: ClipboardEvent) => any) | null = null;
    public onpause: ((ev: Event) => any) | null = null;
    public onplay: ((ev: Event) => any) | null = null;
    public onplaying: ((ev: Event) => any) | null = null;
    public onpointercancel: ((ev: PointerEvent) => any) | null = null;
    public onpointerdown: ((ev: PointerEvent) => any) | null = null;
    public onpointerenter: ((ev: PointerEvent) => any) | null = null;
    public onpointerleave: ((ev: PointerEvent) => any) | null = null;
    public onpointermove: ((ev: PointerEvent) => any) | null = null;
    public onpointerout: ((ev: PointerEvent) => any) | null = null;
    public onpointerover: ((ev: PointerEvent) => any) | null = null;
    public onpointerup: ((ev: PointerEvent) => any) | null = null;
    public onprogress: ((ev: ProgressEvent) => any) | null = null;
    public onratechange: ((ev: Event) => any) | null = null;
    public onreset: ((ev: Event) => any) | null = null;
    public onscroll: ((ev: UIEvent) => any) | null = null;
    public onseeked: ((ev: Event) => any) | null = null;
    public onseeking: ((ev: Event) => any) | null = null;
    public onselect: ((ev: UIEvent) => any) | null = null;
    public onselectstart: ((ev: Event) => any) | null = null;
    public onstalled: ((ev: Event) => any) | null = null;
    public onsubmit: ((ev: Event) => any) | null = null;
    public onsuspend: ((ev: Event) => any) | null = null;
    public ontimeupdate: ((ev: Event) => any) | null = null;
    public ontouchcancel: ((ev: TouchEvent) => any) | null = null;
    public ontouchend: ((ev: TouchEvent) => any) | null = null;
    public ontouchmove: ((ev: TouchEvent) => any) | null = null;
    public ontouchstart: ((ev: TouchEvent) => any) | null = null;
    public onvolumechange: ((ev: Event) => any) | null = null;
    public onwaiting: ((ev: Event) => any) | null = null;
    public onwebkitfullscreenchange: ((ev: Event) => any) | null = null;
    public onwebkitfullscreenerror: ((ev: Event) => any) | null = null;
    public onwheel: ((ev: WheelEvent) => any) | null = null;
    public outerHTML: string = '';
    public outerText: string = '';
    public onactivate: ((ev: Event) => any) | null = null;
    // @ts-ignore
    public readonly ownerDocument: Document;
    public readonly parentElement: HTMLElement | null = null;
    public readonly parentNode: Node | null = null;
    public readonly prefix: string | null = null;
    public readonly previousElementSibling: Element | null = null;
    public readonly previousSibling: Node | null = null;
    public readonly scrollHeight: number = -1;
    public scrollLeft: number = -1;
    public scrollTop: number = -1;
    public readonly scrollWidth: number = -1;
    public readonly shadowRoot: ShadowRoot | null = null;
    public slot: string = '';
    public spellcheck: boolean = false;
    // @ts-ignore
    public readonly style: CSSStyleDeclaration;
    public tabIndex: number = -1;
    public readonly tagName: string = '';
    public textContent: string | null = null;
    public title: string = '';

    private returnPlaceholder: any = {};

    constructor(width: number | undefined, height: number | undefined) {
        this.width = width !== undefined ? width : 100;
        this.height = height !== undefined ? height : 100;
    }

    public addEventListener<K extends keyof ElementEventMap>(
        type: K,
        listener: (ev: ElementEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
    ): void;
    public addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
    ): void;
    // tslint:disable-next-line:unified-signatures
    public addEventListener(
        type: string,
        // tslint:disable-next-line
        listener: EventListenerOrEventListenerObject | null,
        options?: boolean | AddEventListenerOptions
    ): void;
    public addEventListener<K extends keyof GlobalEventHandlersEventMap>(
        type: K,
        listener: (ev: GlobalEventHandlersEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
    ): void;
    public addEventListener<K extends keyof GlobalEventHandlersEventMap>(
        type: K,
        listener: (ev: GlobalEventHandlersEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
    ): void;
    public addEventListener<K extends keyof ElementEventMap>(
        type: K,
        listener: (ev: ElementEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
    ): void;
    public addEventListener<K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (ev: HTMLElementEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
    ): void;
    public addEventListener<K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (ev: HTMLElementEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
    ): void;
    public addEventListener<K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (ev: HTMLElementEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions
    ): void;
    public addEventListener(
        type: any,
        listener: any,
        options?: boolean | AddEventListenerOptions
    ): void {
        return;
    }

    public animate(
        keyframes: AnimationKeyFrame | AnimationKeyFrame[],
        options: number | AnimationOptions
    ): Animation {
        return this.returnPlaceholder as Animation;
    }

    public append(...nodes: Array<Node | string>): void {
        return;
    }

    public appendChild<T extends Node>(newChild: T): T;
    public appendChild<T extends Node>(newChild: T): T;
    public appendChild(newChild: any): any {
        return this.returnPlaceholder as Node;
    }

    public attachShadow(shadowRootInitDict: ShadowRootInit): ShadowRoot {
        return this.returnPlaceholder as ShadowRoot;
    }

    public blur(): void {
        return;
    }

    public click(): void {
        return;
    }

    public cloneNode(deep?: boolean): Node {
        return this.returnPlaceholder as Node;
    }

    public closest(selectors: string): Element | null;
    public closest<K extends keyof HTMLElementTagNameMap>(
        selector: K
    ): HTMLElementTagNameMap[K] | null;
    public closest<K extends keyof SVGElementTagNameMap>(
        selector: K
    ): SVGElementTagNameMap[K] | null;
    public closest(selector: string): Element | null;
    public closest<K extends keyof HTMLElementTagNameMap>(
        selector: K
    ): HTMLElementTagNameMap[K] | null;
    public closest<K extends keyof SVGElementTagNameMap>(
        selector: K
    ): SVGElementTagNameMap[K] | null;
    public closest(selectors: any): any {
        return this.returnPlaceholder;
    }

    public compareDocumentPosition(other: Node): number {
        return 0;
    }

    public contains(child: Node): boolean {
        return false;
    }

    public dispatchEvent(evt: Event): boolean {
        return false;
    }

    public dragDrop(): boolean {
        return false;
    }

    public focus(): void {
        return;
    }

    public getAttribute(qualifiedName: string): string | null {
        return null;
    }

    public getAttributeNS(namespaceURI: string, localName: string): string {
        return '';
    }

    public getAttributeNode(name: string): Attr | null {
        return null;
    }

    public getAttributeNodeNS(namespaceURI: string, localName: string): Attr | null {
        return null;
    }

    public getBoundingClientRect(): ClientRect | DOMRect {
        return this.returnPlaceholder as ClientRect;
    }

    public getClientRects(): ClientRectList | DOMRectList {
        return this.returnPlaceholder as ClientRectList;
    }

    public getContext(
        contextId: 'webgl2' | 'experimental-webgl2',
        contextAttributes?: WebGLContextAttributes
    ): WebGL2RenderingContext | null;
    public getContext(
        contextId: '2d',
        contextAttributes?: Canvas2DContextAttributes
    ): CanvasRenderingContext2D | null;
    public getContext(
        contextId: 'webgl' | 'experimental-webgl',
        contextAttributes?: WebGLContextAttributes
    ): WebGLRenderingContext | null;
    public getContext(
        contextId: string,
        contextAttributes?: {}
    ): CanvasRenderingContext2D | WebGLRenderingContext | null;
    public getContext(
        contextId:
            | 'webgl2'
            | 'experimental-webgl2'
            | '2d'
            | 'webgl'
            | 'experimental-webgl'
            | string,
        contextAttributes?: WebGLContextAttributes | Canvas2DContextAttributes | {}
    ): WebGL2RenderingContext | null | CanvasRenderingContext2D | WebGLRenderingContext {
        switch (contextId) {
            case '2d':
                return new CanvasRenderingContext2DMock(this);
            case 'webgl2':
                return new WebGL2RenderingContextMock(this);
        }
        return null;
    }

    public getElementsByClassName(classNames: string): NodeListOf<Element> {
        return this.returnPlaceholder as NodeListOf<Element>;
    }

    public getElementsByTagName<K extends keyof HTMLElementTagNameMap>(
        name: K
    ): NodeListOf<HTMLElementTagNameMap[K]>;
    public getElementsByTagName<K extends keyof SVGElementTagNameMap>(
        name: K
    ): NodeListOf<SVGElementTagNameMap[K]>;
    public getElementsByTagName(name: string): NodeListOf<Element>;
    public getElementsByTagName<K extends keyof HTMLElementTagNameMap>(
        name: K
    ): NodeListOf<HTMLElementTagNameMap[K]>;
    public getElementsByTagName<K extends keyof SVGElementTagNameMap>(
        name: K
    ): NodeListOf<SVGElementTagNameMap[K]>;
    public getElementsByTagName(name: any): any {
        return this.returnPlaceholder;
    }

    public getElementsByTagNameNS(
        namespaceURI: 'http://www.w3.org/1999/xhtml',
        localName: string
    ): HTMLCollectionOf<HTMLElement>;
    public getElementsByTagNameNS(
        namespaceURI: 'http://www.w3.org/2000/svg',
        localName: string
    ): HTMLCollectionOf<SVGElement>;
    public getElementsByTagNameNS(
        namespaceURI: string,
        localName: string
    ): HTMLCollectionOf<Element>;
    public getElementsByTagNameNS(
        namespaceURI: 'http://www.w3.org/1999/xhtml' | 'http://www.w3.org/2000/svg' | string,
        localName: string
    ): HTMLCollectionOf<HTMLElement> | HTMLCollectionOf<SVGElement> | HTMLCollectionOf<Element> {
        return this.returnPlaceholder as HTMLCollectionOf<HTMLElement>;
    }

    public hasAttribute(name: string): boolean {
        return false;
    }

    public hasAttributeNS(namespaceURI: string, localName: string): boolean {
        return false;
    }

    public hasAttributes(): boolean {
        return false;
    }

    public hasChildNodes(): boolean {
        return false;
    }

    public insertAdjacentElement(
        position: InsertPosition,
        insertedElement: Element
    ): Element | null {
        return null;
    }

    public insertAdjacentHTML(where: InsertPosition, html: string): void {
        return;
    }

    public insertAdjacentText(where: InsertPosition, text: string): void {
        return;
    }

    public insertBefore<T extends Node>(newChild: T, refChild: Node | null): T;
    public insertBefore<T extends Node>(newChild: T, refChild: Node | null): T;
    public insertBefore(newChild: any, refChild: Node | null): any {
        return this.returnPlaceholder as Node;
    }

    public isDefaultNamespace(namespaceURI: string | null): boolean {
        return false;
    }

    public isEqualNode(arg: Node): boolean {
        return false;
    }

    public isSameNode(other: Node): boolean {
        return false;
    }

    public lookupNamespaceURI(prefix: string | null): string | null {
        return null;
    }

    public lookupPrefix(namespaceURI: string | null): string | null {
        return null;
    }

    public matches(selectors: string): boolean {
        return false;
    }

    public msGetInputContext(): MSInputMethodContext {
        return this.returnPlaceholder as MSInputMethodContext;
    }

    public msGetRegionContent(): any {
        return this.returnPlaceholder;
    }

    public msGetUntransformedBounds(): ClientRect {
        return this.returnPlaceholder as ClientRect;
    }

    public msMatchesSelector(selectors: string): boolean {
        return false;
    }

    public msReleasePointerCapture(pointerId: number): void {
        return;
    }

    public msSetPointerCapture(pointerId: number): void {
        return;
    }

    public msToBlob(): Blob {
        return this.returnPlaceholder as Blob;
    }

    public msZoomTo(args: MsZoomToOptions): void {
        return;
    }

    public normalize(): void {
        return;
    }

    public prepend(...nodes: Array<Node | string>): void {
        return;
    }

    public querySelector<K extends keyof HTMLElementTagNameMap>(
        selectors: K
    ): HTMLElementTagNameMap[K] | null;
    public querySelector<K extends keyof SVGElementTagNameMap>(
        selectors: K
    ): SVGElementTagNameMap[K] | null;
    public querySelector<E extends Element = Element>(selectors: string): E | null;
    public querySelector<K extends keyof HTMLElementTagNameMap>(
        selectors: K
    ): HTMLElementTagNameMap[K] | null;
    public querySelector<K extends keyof SVGElementTagNameMap>(
        selectors: K
    ): SVGElementTagNameMap[K] | null;
    public querySelector<E extends Element = Element>(selectors: string): E | null;
    public querySelector(selectors: any): any {
        return this.returnPlaceholder;
    }

    public querySelectorAll<K extends keyof HTMLElementTagNameMap>(
        selectors: K
    ): NodeListOf<HTMLElementTagNameMap[K]>;
    public querySelectorAll<K extends keyof SVGElementTagNameMap>(
        selectors: K
    ): NodeListOf<SVGElementTagNameMap[K]>;
    public querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;
    public querySelectorAll<K extends keyof HTMLElementTagNameMap>(
        selectors: K
    ): NodeListOf<HTMLElementTagNameMap[K]>;
    public querySelectorAll<K extends keyof SVGElementTagNameMap>(
        selectors: K
    ): NodeListOf<SVGElementTagNameMap[K]>;
    public querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;
    public querySelectorAll(selectors: any): any {
        return this.returnPlaceholder;
    }

    public releasePointerCapture(pointerId: number): void {
        return;
    }

    public remove(): void {
        return;
    }

    public removeAttribute(qualifiedName: string): void {
        return;
    }

    public removeAttributeNS(namespaceURI: string, localName: string): void {
        return;
    }

    public removeAttributeNode(oldAttr: Attr): Attr {
        return this.returnPlaceholder as Attr;
    }

    public removeChild<T extends Node>(oldChild: T): T;
    public removeChild<T extends Node>(oldChild: T): T;
    public removeChild(oldChild: any): any {
        return this.returnPlaceholder as Node;
    }

    public removeEventListener<K extends keyof ElementEventMap>(
        type: K,
        listener: (ev: ElementEventMap[K]) => any,
        options?: boolean | EventListenerOptions
    ): void;
    public removeEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions
    ): void;
    public removeEventListener(
        type: string,
        listener?: EventListenerOrEventListenerObject | null,
        options?: EventListenerOptions | boolean
    ): void;
    public removeEventListener<K extends keyof GlobalEventHandlersEventMap>(
        type: K,
        listener: (ev: GlobalEventHandlersEventMap[K]) => any,
        options?: boolean | EventListenerOptions
    ): void;
    public removeEventListener<K extends keyof GlobalEventHandlersEventMap>(
        type: K,
        listener: (ev: GlobalEventHandlersEventMap[K]) => any,
        options?: boolean | EventListenerOptions
    ): void;
    public removeEventListener<K extends keyof ElementEventMap>(
        type: K,
        listener: (ev: ElementEventMap[K]) => any,
        options?: boolean | EventListenerOptions
    ): void;
    public removeEventListener<K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (ev: HTMLElementEventMap[K]) => any,
        options?: boolean | EventListenerOptions
    ): void;
    public removeEventListener<K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (ev: HTMLElementEventMap[K]) => any,
        options?: boolean | EventListenerOptions
    ): void;
    public removeEventListener<K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (ev: HTMLElementEventMap[K]) => any,
        options?: boolean | EventListenerOptions
    ): void;
    public removeEventListener(
        type: any,
        listener?: any,
        options?: boolean | EventListenerOptions
    ): void {
        return;
    }

    public replaceChild<T extends Node>(newChild: Node, oldChild: T): T;
    public replaceChild<T extends Node>(newChild: Node, oldChild: T): T;
    public replaceChild(newChild: Node, oldChild: any): any {
        return this.returnPlaceholder as Node;
    }

    public requestFullscreen(): void {
        return;
    }

    public requestPointerLock(): void {
        return;
    }

    public scroll(options?: ScrollToOptions): void;
    public scroll(x: number, y: number): void;
    public scroll(options?: ScrollToOptions | number, y?: number): void {
        return;
    }

    public scrollBy(options?: ScrollToOptions): void;
    public scrollBy(x: number, y: number): void;
    public scrollBy(options?: ScrollToOptions | number, y?: number): void {
        return;
    }

    public scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void {
        return;
    }

    public scrollTo(options?: ScrollToOptions): void;
    public scrollTo(x: number, y: number): void;
    public scrollTo(options?: ScrollToOptions | number, y?: number): void {
        return;
    }

    public setAttribute(qualifiedName: string, value: string): void {
        return;
    }

    public setAttributeNS(namespaceURI: string, qualifiedName: string, value: string): void {
        return;
    }

    public setAttributeNode(newAttr: Attr): Attr {
        return this.returnPlaceholder as Attr;
    }

    public setAttributeNodeNS(newAttr: Attr): Attr {
        return this.returnPlaceholder as Attr;
    }

    public setPointerCapture(pointerId: number): void {
        return;
    }

    public toBlob(callback: (result: Blob | null) => void, type?: string, ...args: any[]): void {
        return;
    }

    public toDataURL(type?: string, ...args: any[]): string {
        return '';
    }

    public webkitMatchesSelector(selectors: string): boolean {
        return false;
    }

    public webkitRequestFullScreen(): void {
        return;
    }

    public webkitRequestFullscreen(): void {
        return;
    }
}

export default HTMLCanvaElementMock;
