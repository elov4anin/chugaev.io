export namespace IElastic {

    export interface Okved {
        id: number;
        parentId: number;
        code: string;
        name: string;
    }

    export interface Okpd {
        id: number;
        parentId: number;
        code: string;
        name: string;
    }

    export interface Okpd {
        id: number;
        parentId: number;
        code: string;
        name: string;
    }

    export interface Fias {
        id: string;
        parentId: string;
        name: string;
    }

    export interface Company {
        id: number;
        name: string;
        inn: string;
        ogrn: string;
    }

    export interface Contract {
        companyInnSuggest?: string;
        companyNameNgram?: string;
        companyNameSynonym?: string;
        companyOgrnSuggest?: string;
        contractId?: string;
        contractNumber?: string;
        contractSum?: number;
        contractor?: ContractCompany[];
        customer?: ContractCompany[];
        endDate?: string;
        nameNgramm?: string;
        nameSynonym?: string;
        offerTypeId?: string;
        offerTypeName?: string;
        participant?: ContractParticipant[];
        positions?: ContractPositions[];
        regionIds?: string[];
        regionNames?: string[];
        startDate?: string;
        statusId?: number;
        title?: string;
        titleNgram?: string;
        titleSynonym?: string;
        url?: string;
    }

    interface ContractPositions {
        name: string;
        okvedCode: string;
        okvedId: string;
        okpdCode: string;
        okpdId: string;
        price: number;
        unitId: string;
        unitName: string;
        positionQuantity: number;
        positionSum: number;
    }

    interface ContractParticipant {
        companyId: number;
        companyName: string;
        companyInn: string;
        companyOgrn: string;
        mspMember: boolean;
    }

    interface ContractCompany {
        companyId: number;
        companyName: string;
        companyInn: string;
        companyOgrn: string;
        regionNames: string;
        regionIds: string[];
        mspMember?: boolean;
    }



    export interface Advert {
        "advertId": string;
        "offerTypeId": number;
        "offerTypeName": string;
        "placingWayId": number;
        "placingWayName": string;
        "placingWayIdStd": number;
        "title": string;
        "winnerId": number;
        "customerId": number;
        "companyId": number;
        "company": AdvertCompanyInterface[];
        "customer": null;
        "participant": AdvertParticipantInterface[];
        "startDate": string;
        "endDate": string;
        "advertSum": number;
        "advertSumWinner": number;
        "countParticipants": number;
        "countRequests": number;
        "regionIds": string[];
        "regionNames": string[];
        "url": string;
        "positions": AdvertPositionInterface[];

        //
        integralMark: number;  // -- Интегральная оценка конкурса
        discountPercent: number; // -- Процент снижения цены в конкурсе
        winnerParticipationCount: number; // -- Количество участий выигравшей компании в конкурсах данного заказчика
        winPercent: number; // -- Процент выигрыша выигравшей компании в конкурсах данного заказчика
        priceIsNotTheBest: boolean; // -- Выигрыш не с наименьшей ценой
        durationIsLessAvg: boolean; // -- Длительность конкурса меньше средней
        youngCompany: boolean; // -- Победителю меньше года
        rejectedRequestExists: boolean; // -- Отклоненные заявки в конкурсе
        affiliateExists: boolean; // -- Аффилированные связи победителя с другими участниками
        avgDiscountPercent: number; // -- Среднее снижение цены по заказчику %
    }

    interface AdvertCompanyInterface {
        "companyId": number;
        "companyName": string;
        "companyInn": string;
        "companyOgrn": string;
    }

    interface AdvertPositionInterface {
        "lotId": number;
        "name": string;
        "okvedCode": string;
        "okvedId": string;
        "okpdCode": string;
        "okpdId": string;
        "price": number;
        "unitId": string;
        "unitName": string;
        "positionQuantity": number;
        "positionSum": number;
        "positionSumWinner": number;
    }


    interface AdvertParticipantInterface {
        "lotId": number;
        "companyID": number;
        "companyName": string;
        "companyInn": string;
        "companyOgrn": string;
        "okpd_as_str": string[];
        "max_sum": number;
        "isAccepted": boolean;
        "isWinner": boolean;
        "price": number;
        "registrationDate": string;
        "mspMember": boolean;
    }
}
