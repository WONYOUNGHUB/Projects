package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import util.DBUtil;
import vo.Movie;
import vo.Reserve;

public class MovieDAO {
	static final String SQL_INSERT = "INSERT INTO movie values( ?, ?, ?)";
	static final String SQL_DELETE = "delete from movie where moviecode = ? ";
	static final String SQL_SELECTALL = "select * from movie";
	static final String SQL_REXIST = "select * from reserve where moviecode = ?";
	static final String SQL_RESERVEDELETE = "delete * from reserve where moviecode = ?";
	Connection conn;
	PreparedStatement st;
	ResultSet rs;
	int result;
	
	public int reserveDelete(int moviecode) {
		conn = DBUtil.getConnection();
		try {
			st = conn.prepareStatement(SQL_DELETE);
			st.setInt(1, moviecode);
			result = st.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, st, conn);
		}
		return result;
	}

	
	public List<Reserve> isReserveExist(int moviecode) {
		List<Reserve> mlist = new ArrayList<>();
		Reserve reserve = null;
		conn = DBUtil.getConnection();
		try {
			st = conn.prepareStatement(SQL_REXIST);
			st.setInt(1, moviecode);
			rs = st.executeQuery();
			while(rs.next()) {
				reserve = makeBoard(rs);
				mlist.add(reserve);
			}				
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, st, conn);
		}		
		return mlist;
	}
	
	public List<Movie> selectAllMovie() {
		List<Movie> mlist = new ArrayList<>();
		Movie movie = null;
		conn = DBUtil.getConnection();
		try {
			st = conn.prepareStatement(SQL_SELECTALL);
			rs = st.executeQuery();
			while(rs.next()) {
				movie = movieListResult(rs);
				mlist.add(movie);
			}				
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, st, conn);
		}		
		return mlist;
	}
	
	
	public int insertMovie(Movie movie) {
		conn = DBUtil.getConnection();
		try {
			st = conn.prepareStatement(SQL_INSERT);
            st.setInt(1, movie.getMoviecode());
            st.setString(2, movie.getDirector());
            st.setString(3, movie.getTitle());
			result = st.executeUpdate();			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, st, conn);
		}		
		return result;
	}
	public int deleteMovie(int moviecode) {
		conn = DBUtil.getConnection();
		try {
			st = conn.prepareStatement(SQL_DELETE);
            st.setInt(1, moviecode);
			result = st.executeUpdate();			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, st, conn);
		}		
		return result;
	}
	private Movie movieListResult(ResultSet rs) throws SQLException {
		Movie movie = new Movie();
		movie.setMoviecode(rs.getInt(1));
		movie.setDirector(rs.getString(2));
		movie.setTitle(rs.getString(3));
		return movie;
	}
	private Reserve makeBoard(ResultSet rs) throws SQLException {
		Reserve reserve = new Reserve();
		reserve.setSeatcode(rs.getString(1));
		reserve.setMoviecode(rs.getInt(2));
		reserve.setMemberid(rs.getString(3));
		reserve.setReservedate(rs.getDate(4));
		return reserve;
	}

}
