"use strict";

const { Contract } = require("fabric-contract-api");

class Chainlinks extends Contract {
    async init(ctx){
        console.info("Chaincode Instantiated");
    }

    async createPassport(
        ctx,
      	passId,
  	    photo,
  	    biometric,
  	    name,
  	    address,
  	    nationality,
  	    issuePlace,
  	    bloodGroup,
  	    sex,
  	    DOB,
        owner
    ) {
        let passport = {
  	        passId,
  	        photo,
  	        biometric,
  	        name,
  	        address,
  	        nationality,
  	        issuePlace,
  	        bloodGroup,
  	        sex,
  	        status = 'NotIntransit',
  	        validity = 'Valid',
  	        DOB,
  	        DOI = Date(),
  	        DOE,
  	        forTravel = true,
            owner
        };
        console.info(passport);
        try {
            await ctx.stub.putState(
                passport.passId,
                Buffer.from(JSON.stringify(passport))
            );
            console.log("The passport is created successfully");
            return(JSON.stringify({response:"The passport is created successfully!!!"}));
        } catch (error) {
            throw new Error(
                "The passport is not created successfully this the error faced in creating: " +
                    error
            );
        }
    }

    async createPoliceRecords(
        ctx,
  	    firId,
  	    name,
  	    address,
  	    nationality,
  	    cStation,
  	    bloodGroup,
  	    sex,
  	    level,
  	    owner
    ) {
        let policeRecord = {
            firId,
            name,
	        address,
            registerDate: Date(),
            nationality,
            status: "Active",
	        cStation,
	        bloodGroup,
	        sex,
	        level,
            owner,
            docType: "Police Record",
        };
        console.info(item);
        try {
            await ctx.stub.putState(
                policeRecord.firId,
                Buffer.from(JSON.stringify(policeRecord))
            );
            console.log("The Police Record is created successfully");
            return(JSON.stringify({response:"The Police Record is created successfully!!!"}));
        } catch (error) {
            throw new Error(
                "The Police Record is not created successfully this the error faced in creating: " +
                    error
            );
        }
    }

    async viewPassports(ctx, querystring) {
        try {
            const resultIterator = await ctx.stub.getQueryResult(querystring);
            const passports = [];
            while(true) {
                let res = await resultIterator.next();
                if(res.value && res.value.toString()) {
                    let passport = {};
                    passport.Key = res.value.Key;
                    passport.Record = JSON.parse(res.value.value.toString("utf8"));
                    passports.push(passport);
                }
                if (res.done) {
                    await resultIterator.close();
                    return passports;
                }
            }
        } catch (error) {
            throw new Error(`Some error has occured ${error}`);
        }
    }

    async viewPoliceRecords(ctx, querystring) {
        try {
            const resultIterator = await ctx.stub.getQueryResult(querystring);
            const policeRecords = [];
            while(true) {
                let res = await resultIterator.next();
                if(res.value && res.value.toString()) {
                    let policeRecord = {};
                    policeRecord.Key = res.value.Key;
                    policeRecord.Record = JSON.parse(res.value.value.toString("utf8"));
                    policeRecords.push(policeRecord);
                }
                if (res.done) {
                    await resultIterator.close();
                    return policeRecords;
                }
            }
        } catch (error) {
            throw new Error(`Some error has occured ${error}`);
        }
    }

    async changeItemOwner(ctx, id, newowner) {
        try {
            const itemAsBytes = await ctx.stub.getState(id);
            if (!itemAsBytes || itemAsBytes.length === 0) {
                throw new Error(`Item with itemid ${id} does not exist`);
            }
            console.log(itemAsBytes.toString());
            let item = JSON.parse(itemAsBytes.toString());
            item.owner = newowner;
            try {
                await ctx.stub.putState(
                    item.itemId,
                    Buffer.from(JSON.stringify(item))
                );
                console.log("The owner of item is updated");
                return(JSON.stringify({response:`Item with itemid ${id} has changed its owner to ${newowner}!!!`}));
            } catch (error) {
                throw new Error(
                    `Item with itemid ${id} has not changed correctly: ` +
                        error
                );
            }
        } catch (error) {
            throw new Error(`Some error has occured ${error}`);
        }
    }

    async endAuction(ctx, id) {
        try {
            const auctionAsBytes = await ctx.stub.getState(id);
            if (!auctionAsBytes || auctionAsBytes.length === 0) {
                throw new Error(`Auction with auctionid ${id} does not exist`);
            }
            console.log(auctionAsBytes.toString());
            let auction = JSON.parse(auctionAsBytes.toString());
            auction.status = "Completed";
            try {
                await ctx.stub.putState(
                    auction.auctionId,
                    Buffer.from(JSON.stringify(auction))
                );
                console.log("The auction  is updated");
                return(JSON.stringify({response:`Auction with auctionid ${id} has ended!!!`}));
            } catch (error) {
                throw new Error(
                    `Auction with auctionid ${id} has  not ended correctly: ` +
                        error
                );
            }
        } catch (error) {
            throw new Error(`Some error has occured ${error}`);
        }
    }

    async makeBid(
        ctx,
        bidId,
        auctionId,
        bidValue,
        owner,
    ) {
        let bid = {
            bidId,
            startTime: Date(),
            bidValue,
            owner,
            docType: "bid",
        };
        console.info(bid);
        try {
            const auctionAsBytes = await ctx.stub.getState(auctionId);
            if (!auctionAsBytes || auctionAsBytes.length === 0) {
                throw new Error(`Auction with auctionid ${id} does not exist`);
            }
            console.log(auctionAsBytes.toString());
            let auction = JSON.parse(auctionAsBytes.toString());
            if(auction.status === "Completed")
                throw new Error(`Auction has been completed so bid cannot be placed!!`);
            else if(auction.basePrice>=bid.bidValue)
                throw new Error (`Bid is not meeting basepriceof auction!!!`);
            else {
                if(auction.bid === undefined)
                    auction.bid = bid
                else {
                    if(auction.bid.bidValue && auction.bid.bidValue<bidValue)
                        auction.bid = bid;
                    else
                        throw new Error(`Bid value is lower than the current bid value`);
                }
            }
            try {
                await ctx.stub.putState(
                    auction.auctionId,
                    Buffer.from(JSON.stringify(auction))
                );
                console.log("The auction is updated");
                return(JSON.stringify({response:`Bid has been made current price of auction is ${auction.bid.bidValue}!!!`}));
            } catch (error) {
                throw new Error(
                    `Bid has not been made : ` +
                        error
                );
            }
        } catch (error) {
            throw new Error(
                "Some unseen error has occured: " +
                    error
            );
        }
    }

    async getItemHistory(ctx, id){
        try {
            const resultIterator = await ctx.stub.getHistoryForKey(id);
            const items = [];
            while(true) {
                let res = await resultIterator.next();
                if(res.value && res.value.toString()) {
                    let item = {};
                    item.Key = res.value.Key;
                    item.Record = JSON.parse(res.value.value.toString("utf8"));
                    items.push(item);
                }
                if (res.done) {
                    await resultIterator.close();
                    return items;
                }
            }
        } catch (error) {
            throw new Error(`Some error has occured ${error}`);
        }
    }

    async getPassportHistory(ctx,id){
        try {
            const resultIterator = await ctx.stub.getHistoryForKey(id);
            const passports = [];
            while(true) {
                let res = await resultIterator.next();
                if(res.value && res.value.toString()) {
                    let passport = {};
                    passport.Key = res.value.Key;
                    passport.Record = JSON.parse(res.value.value.toString("utf8"));
                    passports.push(passport);
                }
                if (res.done) {
                    await resultIterator.close();
                    return passports;
                }
            }
        } catch (error) {
            throw new Error(`Some error has occured ${error}`);
        }
    }

}

module.exports = Chainlinks;
