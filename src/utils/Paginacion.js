export class PaginationDto{
    limit;
    offset;
    nextPage;
    total;
}

export class Paginacion{

    limitRegex = /limit=\d+/;
    offsetRegex = /offset=\d+/;

    parseLimit(limit) {
        return !isNaN(parseInt(limit)) ? parseInt(limit):0;
    }

    parseOffset(offset){
        return !isNaN(parseInt(offset)) ? parseInt(offset):0;
    }

    buildPaginationDto(limit, currentOffset, total, path){
        const response = new PaginationDto();
        response.limit=limit;
        response.offset=currentOffset;
        response.total=total;

        if (limit !== -1) {
            response.nextPage = limit + currentOffset<total ? this.buildNextPage(path, limit, currentOffset) : ""
        }
        return response;
    }

    buildNextPage(path, limit, currentOffset){
        let url = BASE_URL + path;
    }

}

