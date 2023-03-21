package model;

import java.util.List;

import vo.Movie;
import vo.Reserve;

public class MovieService {
	MovieDAO dao = new MovieDAO();
	
	public List<Reserve> isReserveExist(int moviecode){
		return dao.isReserveExist(moviecode);
	}
	
	public List<Movie> selectAllMovie(){
		return dao.selectAllMovie();
	}
	
	public  int insertMovie(Movie movie) {
		return dao.insertMovie(movie);
	}
	
	
	public int deleteMovie(int moviecode) {
		return dao.deleteMovie(moviecode);
	}
	
	public int reserveDelete(int moviecode) {
		return dao.reserveDelete(moviecode);
	}
	
}
