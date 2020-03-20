"use strict";

const { Contract } = require("fabric-contract-api");

class Chainlinks extends Contract {
    async init(ctx){
        console.info("Chaincode Instantiated");
    }

    async createPassport(
        ctx,
        passportId,
        photo,
        aadharNumber,
        firstName,
        middleName,
        lastName,
        address,
        nationality,
        issuePlace,
        bloodGroup,
        sex,
        dob,
        doe
    ) {
        let passport = {
            passportId,
            photo,
            aadharNumber,
            firstName,
            middleName,
            lastName,
            address,
            nationality,
            issuePlace,
            bloodGroup,
            sex,
            dob,
            doi: Date(),
            doe,
            validity: "Active",
            travelPrivilage: true,
            travelStatus: "Not Intransit",
            docType: "Passport",
        };
        console.info(passport);
        try {
            await ctx.stub.putState(
                passport.passportId,
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

    async viewPassport(ctx, querystring) {
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

    async createPoliceRecords(
        ctx,
        policeRecordId,
        photo,
        aadharNumber,
        firstName,
        middleName,
        lastName,
        address,
        nationality,
        bloodGroup,
        sex,
        stationName,
        intensity,
        description
    ) {
        let policeRecord = {
            policeRecordId,
            photo,
            aadharNumber,
            firstName,
            middleName,
            lastName,
            address,
            nationality,
            bloodGroup,
            sex,
            stationName,
            intensity,
            description,
            doi: Date(),
            status: "Open",
            docType: "Police Record",
        };
        console.info(policeRecord);
        try {
            await ctx.stub.putState(
                policeRecord.policeRecordId,
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

    async viewPoliceRecord(ctx, querystring) {
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

    async travelUpdate(ctx, id, type) {
        const passportAsBytes = await ctx.stub.getState(id);
        if(!passportAsBytes || passportAsBytes.length === 0){
            throw new Error(`There exist no passport with the id ${id}`)
        }
        let passport = JSON.parse(passportAsBytes.toString());
        if(passport.travelPrivilage === false) {
            throw new Error(`The person does not have the right to leave the country or enter the country`);
        }
        else{
            if (type === "Arrival"){
                passport.travelStatus = "Not Intransit";
            }
            else{
                passport.travelStatus = "Intransit";
            }
            try {
                await ctx.stub.putState(passport.passportId, Buffer.from(JSON.stringify(passport)));
                return (JSON.stringify({response:"Travel status has been updated the person is clear to board the aircraft"}));
            } catch (error) {
                throw new Error(`Some error has occured ${error}`);
            }
        }
    }

    async policeRecordStatusUpdate(ctx, id) {
        const policeRecordAsBytes = await ctx.stub.getState(id);
        if(!policeRecordAsBytes || policeRecordAsBytes.length === 0){
            throw new Error(`There exist no Police Record with the id ${id}`)
        }
        let policeRecord = JSON.parse(policeRecordAsBytes.toString());
        try {
            policeRecord.status = "Closed";
            policeRecord.dateOfClosing = Date();
            await ctx.stub.putState(policeRecord.policeRecordId, Buffer.from(JSON.stringify(policeRecord)));
            return (JSON.stringify({response:"Police Record status has been updated the person is cleared of all charges"}));
        } catch (error) {
            throw new Error(`Some error has occured ${error}`);
        }
    }

    async denyTravelPrivilage(ctx, id) {
        const passportAsBytes = await ctx.stub.getState(id);
        if(!passportAsBytes || passportAsBytes.length === 0){
            throw new Error(`There exist no passport with the id ${id}`)
        }
        let passport = JSON.parse(passportAsBytes.toString());
        try {
            passport.travelPrivilage = false;
            await ctx.stub.putState(passport.passportId, Buffer.from(JSON.stringify(passport)));
            return (JSON.stringify({response:"Travel privilage has been denied"}));
        } catch (error) {
            throw new Error(`Some error has occured ${error}`);
        }
    }

    async allowTravelPrivilage(ctx, id) {
        const passportAsBytes = await ctx.stub.getState(id);
        if(!passportAsBytes || passportAsBytes.length === 0){
            throw new Error(`There exist no passport with the id ${id}`)
        }
        let passport = JSON.parse(passportAsBytes.toString());
        try {
            passport.travelPrivilage = true;
            await ctx.stub.putState(passport.passportId, Buffer.from(JSON.stringify(passport)));
            return (JSON.stringify({response:"Travel privilage has been denied"}));
        } catch (error) {
            throw new Error(`Some error has occured ${error}`);
        }
    }


}

module.exports = Chainlinks;
