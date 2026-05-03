package com.silvercircle.backend.controller;

import com.silvercircle.backend.entity.Activity;
import com.silvercircle.backend.entity.User;
import com.silvercircle.backend.service.ActivityService;
import com.silvercircle.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Activity> createActivity(@RequestBody Activity activity) {
        return ResponseEntity.ok(activityService.createActivity(activity));
    }

    @GetMapping
    public ResponseEntity<List<Activity>> getAllActivities() {
        return ResponseEntity.ok(activityService.getAllActivities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> getActivityById(@PathVariable Long id) {
        Activity activity = activityService.getActivityById(id);
        return activity != null ? ResponseEntity.ok(activity) : ResponseEntity.notFound().build();
    }

    @GetMapping("/recommendations")
    public ResponseEntity<List<Activity>> getRecommendations(@RequestParam Long userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }
        List<String> interests = user.getInterests() != null ? new ArrayList<>(user.getInterests()) : new ArrayList<>();
        return ResponseEntity.ok(activityService.getRecommendedActivities(interests, user.getCity()));
    }
}
