const pageSize = 4;
export const paginate = (payload, page) => {    
    --page;
    return payload.slice(page * pageSize, (page + 1) * pageSize);
  }
