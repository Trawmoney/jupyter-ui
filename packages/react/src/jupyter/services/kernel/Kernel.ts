import { Kernel as JupyterKernel, KernelManager, SessionManager } from '@jupyterlab/services';
import { UUID } from '@lumino/coreutils';

export type IKernelProps = {
  kernelManager: KernelManager;
  kernelName: string;
}

export class Kernel {
  private _kernelManager: KernelManager;
  private _kernelName: string;
  private _kernel: Promise<JupyterKernel.IKernelConnection>;

  public constructor(options: IKernelProps) {
    this._kernelManager = options.kernelManager;
    this._kernelName = options.kernelName;
    // Request the effective Jupyter Kernel.
    this._kernel = this.requestKernel();
  }

  private async requestKernel(): Promise<JupyterKernel.IKernelConnection> {
    await this._kernelManager.ready;
    const sessionManager = new SessionManager({
      kernelManager: this._kernelManager,
      serverSettings: this._kernelManager.serverSettings, // Important, do not remove this.
      standby: 'never',
    });
    await sessionManager.ready;
    const randomName = UUID.uuid4();
    const session = await sessionManager.startNew({
      path: randomName,
      name: randomName,
      type: this._kernelName,
    });
    await session.kernel!.info;
    return session.kernel!;
  }

  public getJupyterKernel(): Promise<JupyterKernel.IKernelConnection> {
    return this._kernel;
  }

}

export default Kernel;
