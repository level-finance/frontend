import { configService } from '@/services/config/config.service';
import { LevelSDK, Network } from '@level-finance/sdk';

const network = ((): Network => {
  switch (configService.network.key) {
    case '106':
      return Network.VELAS;
    default:
      return Network.VELAS;
  }
})();

export const balancer = new LevelSDK({
  network,
  rpcUrl: configService.rpc
});
