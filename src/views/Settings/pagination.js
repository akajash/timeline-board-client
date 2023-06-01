import React from 'react'
import { useDispatch ,useSelector} from 'react-redux';


import {
 
    CardFooter,
   
    Pagination,
    PaginationItem,
    PaginationLink,
    
  } from "reactstrap";
import { fetchTemplate } from '../../actions/emailTemplate.js';

const CustomPagination = () => {
    
    const dispatch = useDispatch()
    const currentPage = useSelector((state) => state.page.page)
    const totalPages = useSelector((state) => state.page.totalPages)


    let middlePagination;

    if(totalPages <= 3){
        middlePagination = [...Array(totalPages)].map((_,idx) => (
            <PaginationItem className = {currentPage === idx ? "active" : ""}>
                      <PaginationLink
                        key={idx+1}
                        onClick={() => dispatch(fetchTemplate(idx+1))}
                        disabled={currentPage === idx + 1}
                      >
                        {idx + 1}
                      </PaginationLink>
                    </PaginationItem>
        ))
    } else{
        const startValue = Math.floor((currentPage-1) / 3) * 3;

        middlePagination = [...Array(3)].map((_,idx) => (
                <PaginationItem className={currentPage === idx + 1 ? "active" : ""}>
                <PaginationLink
                  key={startValue + idx + 1}
                  onClick={() => dispatch(fetchTemplate(startValue + idx + 1))}
                  disabled={currentPage === idx + 1}
                >
                  {startValue + idx + 1}
                </PaginationLink>
              </PaginationItem>

                
            ))

            if(!(totalPages - currentPage >= 3)){
            let remaining = totalPages - currentPage + 3

                middlePagination = [...Array(remaining)].map((_,idx) => (
                <PaginationItem className={currentPage === idx + 1 ? "active" : ""}>
                            <PaginationLink
                  key={startValue + idx + 1}
                  onClick={() => dispatch(fetchTemplate(startValue + idx + 1))}
                  style ={totalPages < startValue + idx + 1 ? {display:"none"}: null}
                  disabled={currentPage === idx + 1}
                >
                  {startValue + idx + 1}
                    </PaginationLink>
                </PaginationItem>
                ))
            }
            
        
    }


    return(
        totalPages > 1 && (
            <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    {!(currentPage == 1) && (<PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={() => dispatch(fetchTemplate(currentPage - 1))}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem> 
                    )}
                    
                    {middlePagination}
                    { currentPage !== totalPages && (
                        <PaginationItem>
                      <PaginationLink
                        
                        onClick={() => dispatch(fetchTemplate(currentPage + 1))}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                    )}
                  </Pagination>
                </nav>
              </CardFooter>
        )
    )
}

export default CustomPagination