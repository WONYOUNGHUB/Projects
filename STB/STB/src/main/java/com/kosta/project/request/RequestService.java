package com.kosta.project.request;

import java.util.List;

import com.kosta.project.product.Product;

public class RequestService {
	RequestDAO requestDAO = new RequestDAO();
	
	//개설한 join 조회
	public List<Product> selectMyJoin(String user_id){
		List<Product> requestList = requestDAO.selectMyJoin(user_id);
		return requestList;
	}
	//신청한 join 조회
	public List<Product> selectMyRequest(String user_id){
		List<Product> requestList = requestDAO.selectMyRequest(user_id);
		return requestList;
	}
	//승낙하기 (N을 Y로 바꾸고, CURRENT NUMBER + 1)
	public int acceptRequest(int request_id, int product_id) {
		if(requestDAO.acceptRequest(request_id)>0) {
			return requestDAO.increaseCurrentNumber(product_id);
		} 
		return 0;
	}
	
	//승낙 취소하기 ? (N으로 바꾸기)
	public int refuseRequest(int request_id) {
		return requestDAO.refuseRequest(request_id);
	}
	
	//신청하기
	public int askRequest(RequestVO request) {
		return requestDAO.askRequest(request);
	}
	
	//신청 취소하기
	public int cancelRequest(int request_id, int productid) {
		return requestDAO.cancelRequest(request_id);
	}
	
	//현재 인원 -1
		public int decreaseCurrentNumber(int product_id) {
			return requestDAO.decreaseCurrentNumber(product_id);
	}
	
	
	//조인 닫기(모집완료)
	public int closeJoin(int product_id) {
		return requestDAO.closeJoin(product_id);
	}
	
	//조인 열기(모집중)
		public int openJoin(int product_id) {
			return requestDAO.openJoin(product_id);
		}
	
}
