const uidCounters = {};

/**
 * Returns a unique resource id meant for caching
 */
export function uid(id = 'resource-id') {
    uidCounters[id] = uidCounters[id] || 1;
    const count = uidCounters[id]++;
    return `${id}-${count}`;
}

export type Handle = WebGLVertexArrayObject | undefined | null;

export interface IResourceProps {
    id?: string;
    handle?: Handle;
}

abstract class Resource {
    public readonly id: string;

    // todo: refine type of handle
    public readonly handle: Handle;

    protected constructor(protected gl: WebGL2RenderingContext, props: IResourceProps = {}) {
        if (!gl) {
            throw new Error('Invalid WebGLRenderingContext.');
        }

        const { id, handle } = props;

        this.id = id || uid(this.constructor.name);
        this.handle = handle || this.createHandle();
    }

    public delete() {
        return;
    }

    protected abstract createHandle(): Handle;

}

export default Resource;
