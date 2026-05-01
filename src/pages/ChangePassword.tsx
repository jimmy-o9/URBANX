import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const ChangePassword = () => {
  const { user } = useAuth();

  const [isRecovery, setIsRecovery] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkRecoveryMode = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const queryParams = new URLSearchParams(window.location.search);

      const typeFromHash = hashParams.get("type");
      const typeFromQuery = queryParams.get("type");

      if (typeFromHash === "recovery" || typeFromQuery === "recovery") {
        setIsRecovery(true);
        return;
      }

      const { data } = await supabase.auth.getSession();

      if (data.session && !user?.email) {
        setIsRecovery(true);
      }
    };

    checkRecoveryMode();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.email && !isRecovery) {
      toast.error("User not found. Please login again.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    setLoading(true);

    if (!isRecovery) {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: user!.email!,
        password: currentPassword,
      });

      if (loginError) {
        toast.error("Current password is wrong.");
        setLoading(false);
        return;
      }
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      if (isRecovery) {
        await supabase.auth.signOut();
        window.location.href = "/login";
      }
    }

    setLoading(false);
  };

  return (
    <Layout>
      <section className="container-editorial flex justify-center py-16">
        <div className="w-full max-w-md rounded-2xl border bg-background p-6 shadow-sm">
          <h1 className="font-serif text-4xl">
            {isRecovery ? "Reset Password" : "Change Password"}
          </h1>

          <form onSubmit={handleChangePassword} className="mt-8 space-y-4">
            {!isRecovery && (
              <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-md border px-4 py-3"
                required
              />
            )}

            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-md border px-4 py-3"
              required
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md border px-4 py-3"
              required
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading
                ? "Updating..."
                : isRecovery
                ? "Reset Password"
                : "Update Password"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default ChangePassword;