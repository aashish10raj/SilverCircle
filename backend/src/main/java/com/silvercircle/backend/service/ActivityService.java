package com.silvercircle.backend.service;

import com.silvercircle.backend.entity.Activity;
import com.silvercircle.backend.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;

    public Activity createActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public Activity getActivityById(Long id) {
        return activityRepository.findById(id).orElse(null);
    }
    
    public List<Activity> getRecommendedActivities(List<String> userInterests, String userCity) {
        if ((userInterests == null || userInterests.isEmpty()) && userCity == null) {
            return getAllActivities();
        }
        return activityRepository.findRecommendations(userInterests, userCity);
    }
}
