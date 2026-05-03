package com.silvercircle.backend.service;

import com.silvercircle.backend.entity.User;
import com.silvercircle.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<User> getRecommendations(Long userId) {
        User currentUser = getUserById(userId);
        if (currentUser == null) return List.of();

        List<User> allUsers = userRepository.findAll();
        
        // Simple recommendation logic: +10 for each shared interest, +5 for same city
        return allUsers.stream()
            .filter(u -> !u.getId().equals(userId))
            .sorted((u1, u2) -> {
                int score1 = calculateScore(currentUser, u1);
                int score2 = calculateScore(currentUser, u2);
                return Integer.compare(score2, score1); // Descending order
            })
            .collect(Collectors.toList());
    }

    private int calculateScore(User current, User other) {
        int score = 0;
        if (current.getCity() != null && current.getCity().equalsIgnoreCase(other.getCity())) {
            score += 5;
        }
        if (current.getInterests() != null && other.getInterests() != null) {
            long sharedInterests = current.getInterests().stream()
                .filter(other.getInterests()::contains)
                .count();
            score += (sharedInterests * 10);
        }
        return score;
    }
}
