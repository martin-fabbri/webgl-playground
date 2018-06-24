import {
    HTMLCanvasElementMock,
    WebGL2RenderingContextMock
} from './../../../../../tests/webgl2-canvas-mock/index';
import { default as Resource, Handle, IResourceProps, uid } from './resource';

const canvas = new HTMLCanvasElementMock(100, 100);
const gl = new WebGL2RenderingContextMock(canvas);

// tslint:disable-next-line: max-classes-per-file
class TestResource extends Resource {
    constructor(testGl: WebGL2RenderingContext, testProps: IResourceProps = {}) {
        super(testGl, testProps);
    }

    protected createHandle() {
        return gl.createVertexArray();
    }
}

const testHandle: Handle = { id: 'test' };

describe('WebGL#Resouce', () => {
    it('generates a new uid with default name prefix', () => {
        const uid1 = uid();
        expect(uid1).toContain('1');

        const uid2 = uid();
        expect(uid2).toContain('2');

        const uid3 = uid();
        expect(uid3).toContain('3');
    });

    it('generates a new uid prefixed with the provided name', () => {
        const puid1 = uid('program');
        expect(puid1).toContain('program');
        expect(puid1).toContain('1');

        const puid2 = uid('program');
        expect(puid2).toContain('program');
        expect(puid2).toContain('2');
    });

    it('creates a resource; assigns an uid, creates handle', () => {
        const testResource1 = new TestResource(gl);
        expect(testResource1).toBeInstanceOf(TestResource);
        expect(testResource1.id).toContain('TestResource');
        expect(testResource1.id).toContain('1');
        expect(testResource1.handle).toBeDefined();

        const testResource2 = new TestResource(gl);
        expect(testResource2).toBeInstanceOf(TestResource);
        expect(testResource2.id).toContain('TestResource');
        expect(testResource2.id).toContain('2');
        expect(testResource2.handle).toBeDefined();
    });

    it('creates a resource; assign handle passed in props', () => {
        const testResource = new TestResource(gl, { handle: testHandle });
        expect(testResource).toBeInstanceOf(TestResource);
        expect(testResource.id).toContain('TestResource');
        expect(testResource.handle).toBeDefined();
        expect(testResource.handle).toBe(testHandle);
    });
});
