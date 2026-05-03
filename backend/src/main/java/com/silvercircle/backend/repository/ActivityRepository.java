package com.silvercircle.backend.repository;

import com.silvercircle.backend.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    
    @Query("SELECT a FROM Activity a WHERE a.category IN :categories OR a.location = :city")
    List<Activity> findRecommendations(@Param("categories") List<String> categories, @Param("city") String city);
}
