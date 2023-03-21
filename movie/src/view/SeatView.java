package view;

import java.util.List;

import vo.Seat;

public class SeatView {	
	public static void seatList(List<Seat> seatList) {
		System.out.println("==========좌석을 선택하세요===========");
		for(int i = 0; i <seatList.size(); ++i)
		{
			System.out.print(seatList.get(i).getSeatcode() + "\t");
			System.out.print(seatList.get(i).getReserveyn().equals("n")?"예약가능":"예약불가");
			System.out.print("\t");
			if((i+1)%5==0) 		System.out.println();
		}
		  
	}
}
