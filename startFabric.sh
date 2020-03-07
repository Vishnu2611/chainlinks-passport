./bin/configtxgen -profile ChainlinksGenesis -channelID mychannel -outputBlock ./channel-artifacts/genesis.block

./bin/configtxgen -profile Chainlinks_Channel -outputCreateChannelTx ./channel-artifacts/Chainlinks_Channel.tx -channelID auctionchannel


./bin/configtxgen -profile Chainlinks_Channel -outputAnchorPeersUpdate ./channel-artifacts/Passportseva_Channelanchors.tx -channelID auctionchannel -asOrg PassportsevaMSP

./bin/configtxgen -profile Chainlinks_Channel -outputAnchorPeersUpdate ./channel-artifacts/Police_Channelanchors.tx -channelID auctionchannel -asOrg PoliceMSP

./bin/configtxgen -profile Chainlinks_Channel -outputAnchorPeersUpdate ./channel-artifacts/Airport_Channelanchors.tx -channelID auctionchannel -asOrg AirportMSP