package com.silvercircle.backend.config;

import com.silvercircle.backend.entity.Activity;
import com.silvercircle.backend.entity.User;
import com.silvercircle.backend.repository.ActivityRepository;
import com.silvercircle.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User user1 = User.builder()
                .name("Martha Stewart")
                .email("martha@example.com")
                .password("password123") // In real app, this should be encoded
                .ageRange("70-75")
                .city("New York")
                .interests(Set.of("Gardening", "Reading", "Walking"))
                .preferredLanguage("English")
                .mobilityPreference("nearby")
                .bio("I love plants and a good book. Looking forward to meeting neighbors.")
                .role("USER")
                .build();

            User user2 = User.builder()
                .name("John Doe")
                .email("john@example.com")
                .password("password123")
                .ageRange("65-70")
                .city("New York")
                .interests(Set.of("Chess", "Walking", "History"))
                .preferredLanguage("English")
                .mobilityPreference("both")
                .bio("Retired teacher who enjoys chess and local history walks.")
                .role("USER")
                .build();

            userRepository.save(user1);
            userRepository.save(user2);

            if (activityRepository.count() == 0) {
                Activity act1 = Activity.builder()
                    .title("Central Park Morning Walk")
                    .description("A gentle morning walk around the park. We will walk for 30 minutes and then grab tea.")
                    .host(user1)
                    .category("Walking")
                    .scheduleTime(LocalDateTime.now().plusDays(2).withHour(8).withMinute(0))
                    .location("New York")
                    .isOnline(false)
                    .capacity(10)
                    .currentAttendees(2)
                    .build();

                Activity act2 = Activity.builder()
                    .title("Virtual Book Club: The Great Gatsby")
                    .description("Join us online to discuss chapter 1 of The Great Gatsby.")
                    .host(user2)
                    .category("Reading")
                    .scheduleTime(LocalDateTime.now().plusDays(5).withHour(16).withMinute(0))
                    .location("Zoom Link")
                    .isOnline(true)
                    .capacity(20)
                    .currentAttendees(5)
                    .build();

                activityRepository.save(act1);
                activityRepository.save(act2);
            }
        }
    }
}
