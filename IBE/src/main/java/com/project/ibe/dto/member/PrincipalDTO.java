package com.project.ibe.dto.member;

import com.project.ibe.entity.common.Role;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Builder
@Data
public class PrincipalDTO implements UserDetails {
    private Long memberId;
    private String memberEmail;
    private String memberPassword;
    private Role role;
    private Collection<? extends GrantedAuthority> authorities;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.memberPassword;
    }

    @Override
    public String getUsername() {
        return this.memberEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return  true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
